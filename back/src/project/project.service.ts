import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  create(createProjectDto: CreateProjectDto, userId: string) {
    const project = new this.projectModel({
      ...createProjectDto,
      ownerId: userId,
    });
    return project.save();
  }

  findAll() {
    return this.projectModel.find();
  }

  findOne(id: number) {
    return this.projectModel.findById(id);
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(
      id,
      {
        $set: updateProjectDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return this.projectModel.deleteOne({ _id: id });
  }
}
