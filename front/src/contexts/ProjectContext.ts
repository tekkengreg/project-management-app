import { createContext } from 'react';
import { ProjectContextType } from '../models/types';

const defaultProvider: ProjectContextType = {
  getProjects: async () => {
    Promise.resolve();
  },
  createProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
};

export const ProjectContext =
  createContext<ProjectContextType>(defaultProvider);
