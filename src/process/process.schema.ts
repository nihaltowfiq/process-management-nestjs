import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;

@Schema({ timestamps: true })
export class Process {
  @Prop({ required: true, type: String })
  name: number;

  @Prop({ required: true, type: Number })
  pid: number;

  @Prop({ required: true, type: String })
  creation_time: string;

  @Prop({ required: true, type: [String] })
  logs: string[];
}

export const ProcessSchema = SchemaFactory.createForClass(Process);
