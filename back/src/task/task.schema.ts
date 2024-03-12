import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ require: true })
  _id: UUID;

  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  status: boolean;

  @Prop({ require: true })
  ownerId: UUID;

  @Prop({ require: true })
  projectId: UUID;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
