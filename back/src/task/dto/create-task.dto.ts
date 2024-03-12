import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}
