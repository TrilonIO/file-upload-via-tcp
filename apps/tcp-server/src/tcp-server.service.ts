import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { writeFile, promises } from 'fs';
import { join } from 'path';
import {
  bindNodeCallback,
  from,
  map,
  mergeMap,
  Observable,
  reduce,
} from 'rxjs';
import { File } from './file.interface';

const writeFile$ = bindNodeCallback(writeFile);
const { stat, mkdir } = promises;

@Injectable()
export class TcpServerService implements OnModuleInit {
  private dirPath = join(process.cwd(), 'tcp_server_uploads');

  async onModuleInit() {
    try {
      await stat(this.dirPath);
    } catch {
      await mkdir(this.dirPath);
    }
  }
  private getFilePath(fileName: string): string {
    return join(this.dirPath, fileName);
  }
  saveFile(data: File): Observable<{ success: boolean; fileName: string }> {
    const fileName = `${randomUUID()}-${data.fileName}`;
    return writeFile$(this.getFilePath(fileName), data.buffer).pipe(
      map(() => ({
        success: true,
        fileName,
      })),
    );
  }

  saveFiles(
    data: File[],
  ): Observable<{ success: boolean; fileNames: string[] }> {
    return from(data).pipe(
      mergeMap((file) => {
        const fileName = `${randomUUID()}-${file.fileName}`;
        return writeFile$(this.getFilePath(fileName), file.buffer).pipe(
          map(() => fileName),
        );
      }),
      reduce((acc, file) => {
        acc.push(file);
        return acc;
      }, []),
      map((fileNames) => ({ success: true, fileNames })),
    );
  }
}
