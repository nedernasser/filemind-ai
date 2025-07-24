import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client } from '@elastic/elasticsearch';

import { FileService } from './file.service';
import { File, FileSchema } from './schemas/file.schema';
import { FileController } from './file.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  controllers: [FileController],
  providers: [
    FileService,
    {
      provide: 'ELASTIC_CLIENT',
      useFactory: () => new Client({ node: 'http://elasticsearch:9200' }),
    },
  ],
})
export class FileModule {}
