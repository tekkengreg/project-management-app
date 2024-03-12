import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { randomUUID } from 'crypto';
import { Project } from './project.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Project.name),
          useValue: Project,
        },
        ProjectService,
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create project must be ok', () => {
    const project = {
      _id: () => randomUUID(),
      name: 'Project test',
      ownerId: () => randomUUID(),
    };
    expect(service.create(project)).toBeDefined();
  });
});
