import { ReactNode, useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { ProjectContextType } from '../models/types';
import { config } from '../configs/config';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: Props) => {
  const authContext = useContext(AuthContext);

  const getProjects = async () => {
    const response = await fetch(`${config.backendUrl}/project`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authContext.accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  };
  const createProject = async (name: string) => {
    const response = await fetch(
      `${config.backendUrl}/project/${crypto.randomUUID()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.accessToken}`,
        },
        body: JSON.stringify({ name }),
      }
    );
    const data = await response.json();
    return data;
  };
  const updateProject = async () => {};
  const deleteProject = async () => {};

  const values: ProjectContextType = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  );
};
