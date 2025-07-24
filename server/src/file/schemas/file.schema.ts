import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number; // in bytes

  @Prop()
  content: string; // raw text content extracted from file (for demo, we simplify)

  @Prop()
  elasticId?: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
