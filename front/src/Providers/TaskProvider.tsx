import { ReactNode, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { TaskContextType } from '../models/types';
import { config } from '../configs/config';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const authContext = useContext(AuthContext);

  const getTasks = async (projectId: string) => {
    const response = await fetch(
      `${config.backendUrl}/task?` +
        new URLSearchParams({
          projectId,
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const createTask = async (projectId: string, name: string) => {
    const response = await fetch(
      `${config.backendUrl}/task/${crypto.randomUUID()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.accessToken}`,
        },
        body: JSON.stringify({ projectId, name }),
      }
    );
    const data = await response.json();
    return data;
  };
  const updateTask = async (taskId: string, isDone: boolean) => {
    const response = await fetch(`${config.backendUrl}/task/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authContext.accessToken}`,
      },
      body: JSON.stringify({ isDone }),
    });
    const data = await response.json();
    return data;
  };
  const deleteTask = async () => {};

  const values: TaskContextType = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};
