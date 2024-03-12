import { createContext } from 'react';
import { TaskContextType } from '../models/types';

const defaultProvider: TaskContextType = {
  getTasks: async () => {
    Promise.resolve();
  },
  createTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
};

export const TaskContext = createContext<TaskContextType>(defaultProvider);
