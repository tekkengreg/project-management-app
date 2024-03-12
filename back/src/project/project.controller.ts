import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { isUUID } from 'class-validator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async create(
    @Param('id') id: string,
    @Body() createProjectDto: CreateProjectDto,
    @Req() req,
  ) {
    if (!isUUID(id)) {
      throw new Error('Invalid id');
    }
    return await this.projectService.create(id, createProjectDto, req.user._id);
  }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectService.remove(+id);
  }
}
