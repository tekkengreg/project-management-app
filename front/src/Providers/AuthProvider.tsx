import { ReactNode, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../models/types';
import { config } from '../configs/config';
import { decodeJwt } from '../helpers/jwt';

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${config.backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setAccessToken(data.access_token);
    setUser(decodeJwt(data.access_token));
  };

  const logout = () => {
    setUser(null);
  };

  const values: AuthContextType = {
    user,
    accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
