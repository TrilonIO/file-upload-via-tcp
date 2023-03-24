import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  postFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.sendFileToTCP(file);
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  postFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.appService.sendFilesToTCP(files);
  }

  @Post('files-one-by-one')
  @UseInterceptors(FilesInterceptor('files'))
  postFilesSlow(@UploadedFiles() files: Express.Multer.File[]) {
    return this.appService.sendMultipleFilesOneByOne(files);
  }
}
