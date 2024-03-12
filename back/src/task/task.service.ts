import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(taskId: string, createTaskDto: CreateTaskDto, userId: string) {
    const task = new this.taskModel({
      _id: taskId,
      ...createTaskDto,
      ownerId: userId,
      isDone: false,
    });
    return task.save();
  }

  async findAll(projectId: string) {
    return await this.taskModel.find({ projectId });
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskModel.findByIdAndUpdate(
      id,
      {
        $set: updateTaskDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return await this.taskModel.deleteOne({ _id: id });
  }
}
