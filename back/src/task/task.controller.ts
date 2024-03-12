import {
  Controller,
  Get,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { isUUID } from 'class-validator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async create(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
    @Req() req,
  ) {
    if (!isUUID(id)) {
      throw new Error('Invalid id');
    }
    return await this.taskService.create(id, createTaskDto, req.user._id);
  }

  @Get()
  async findAll(@Query() query: any) {
    return await this.taskService.findAll(query.projectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
