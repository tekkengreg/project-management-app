import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ require: true })
  _id: UUID;

  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  ownerId: UUID;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
