import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDoc = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true }) filename: string;
  @Prop() content: string;
  @Prop() size: number;
}

export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.index({ content: 'text' });
