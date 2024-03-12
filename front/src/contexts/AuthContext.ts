import { createContext } from 'react';
import { AuthContextType } from '../models/types';

const defaultProvider: AuthContextType = {
  user: null,
  login: async () => {
    Promise.resolve();
  },
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultProvider);
