import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { from, map, mergeMap, Observable, reduce } from 'rxjs';
import type { SingleSuccess, MultiSuccess } from './success.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject('FILE_SERVER') private readonly fileService: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  sendFileToTCP(file: Express.Multer.File): Observable<SingleSuccess> {
    return this.fileService.send(
      { cmd: 'upload-file' },
      { fileName: file.originalname, buffer: file.buffer },
    );
  }

  sendFilesToTCP(files: Express.Multer.File[]): Observable<MultiSuccess> {
    return this.fileService.send(
      { cmd: 'upload-files' },
      files.map((file) => ({
        fileName: file.originalname,
        buffer: file.buffer,
      })),
    );
  }

  slowlySendFilesToTCP(files: Express.Multer.File[]): Observable<MultiSuccess> {
    return from(files).pipe(
      mergeMap((file) => {
        return this.fileService.send<SingleSuccess>(
          { cmd: 'upload-file' },
          {
            fileName: file.originalname,
            buffer: file.buffer,
          },
        );
      }),
      reduce((acc, result) => {
        acc.push(result.fileName);
        return acc;
      }, []),
      map((files) => ({ success: true, fileNames: files })),
    );
  }
}
