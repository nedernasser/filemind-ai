import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '@elastic/elasticsearch';
import { File, FileDocument } from './schemas/file.schema';
import { CreateFileDto } from './dto/create-file.dto';

interface FileDocumentSource {
  filename: string;
  content: string;
  size: number;
}

export interface SearchResult {
  id: string;
  size: number | undefined;
  filename: string;
  highlights: string[];
}

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDocument>,
    @Inject('ELASTIC_CLIENT') private readonly elasticClient: Client,
  ) {}

  async uploadFile(createFileDto: CreateFileDto): Promise<File> {
    const maxFileSize = process.env.MAX_FILE_SIZE as string;

    if (createFileDto.size > parseInt(maxFileSize) * 1024 * 1024) {
      throw new BadRequestException(
        `File size exceeds maximum limit (${maxFileSize}MB)`,
      );
    }

    const createdFile = new this.fileModel(createFileDto);
    const savedFile = await createdFile.save();

    await this.elasticClient.index<FileDocumentSource>({
      index: 'file',
      id: savedFile._id as string,
      document: {
        filename: savedFile.filename,
        content: savedFile.content,
        size: createFileDto.size,
      },
      refresh: true,
    });

    return savedFile;
  }

  async searchFiles(query: string): Promise<SearchResult[]> {
    const response = await this.elasticClient.search<FileDocumentSource>({
      index: 'file',
      query: {
        match: { content: query },
      },
      highlight: {
        fields: { content: {} },
      },
    });

    return response.hits.hits.map(
      (hit): SearchResult => ({
        id: hit._id as string,
        size: hit._source?.size,
        filename: hit._source?.filename ?? '',
        highlights: hit.highlight?.content ?? [],
      }),
    );
  }
}
