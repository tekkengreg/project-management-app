import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true })
  _id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ownerId: UUID;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
