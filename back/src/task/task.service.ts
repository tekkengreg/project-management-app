import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  findAll() {
    return this.taskModel.find();
  }

  findOne(id: number) {
    return this.taskModel.findById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(
      id,
      {
        $set: updateTaskDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return this.taskModel.deleteOne({ _id: id });
  }
}
