import {
  Controller,
  Post,
  UploadedFile,
  BadRequestException,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileService, SearchResult } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import * as pdfParse from 'pdf-parse';

@Controller('file')
export class FileController {
  constructor(private readonly filesService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<unknown> {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    let content = '';
    if (file.buffer) content = (await pdfParse(file.buffer)).text;

    console.log(`FILE NAME: ${file.filename}`);

    return this.filesService.uploadFile({
      filename: `${Date.now()}-${file.originalname}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      content,
    });
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<SearchResult[]> {
    return await this.filesService.searchFiles(query);
  }
}
