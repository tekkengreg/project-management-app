import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  _id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  ownerId: UUID;

  @Prop({ required: true })
  projectId: UUID;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
