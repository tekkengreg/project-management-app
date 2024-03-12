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

  async create(
    projectId: string,
    createProjectDto: CreateProjectDto,
    userId: string,
  ) {
    const project = new this.projectModel({
      _id: projectId,
      ...createProjectDto,
      ownerId: userId,
    });
    return await project.save();
  }

  async findAll() {
    return await this.projectModel.find();
  }

  async findOne(id: number) {
    return await this.projectModel.findById(id);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.findByIdAndUpdate(
      id,
      {
        $set: updateProjectDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: number) {
    return await this.projectModel.deleteOne({ _id: id });
  }
}
