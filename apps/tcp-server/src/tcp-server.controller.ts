import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { File } from './file.interface';
import { ParseBufferPipe } from './parse-buffer.pipe';
import { TcpServerService } from './tcp-server.service';

@Controller()
export class TcpServerController {
  constructor(private readonly tcpServerService: TcpServerService) {}

  @MessagePattern({ cmd: 'upload-file' })
  uploadFile(
    @Payload(ParseBufferPipe('buffer'))
    data: File,
  ): Observable<{ success: boolean }> {
    return this.tcpServerService.saveFile(data);
  }

  @MessagePattern({ cmd: 'upload-files' })
  uploadFiles(
    @Payload(ParseBufferPipe('buffer', true))
    data: File[],
  ): Observable<{ success: boolean }> {
    return this.tcpServerService.saveFiles(data);
  }
}
