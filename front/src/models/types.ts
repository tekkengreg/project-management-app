export type AuthContextType = {
  user: {
    _id: string;
    email: string;
  } | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type ProjectContextType = {
  getProjects: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  updateProject: () => Promise<void>;
  deleteProject: () => Promise<void>;
};

export type TaskContextType = {
  getTasks: (projectId: string) => Promise<void>;
  createTask: (projectId: string, name: string) => Promise<void>;
  updateTask: (taskId: string, isDone: boolean) => Promise<void>;
  deleteTask: () => Promise<void>;
};
