import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../api/auth';

interface AuthData {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
}

interface AuthContextProps extends AuthData {
  login: (user: User, token: string, isAdmin: boolean) => void;
  logout: () => void;
}

const defaultAuth: AuthData = {
  user: null,
  token: null,
  isAdmin: false,
};

const AuthContext = createContext<AuthContextProps>({
  ...defaultAuth,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    const stored = sessionStorage.getItem('auth');
    return stored ? JSON.parse(stored) : defaultAuth;
  });

  useEffect(() => {
    sessionStorage.setItem('auth', JSON.stringify(authData));
  }, [authData]);

  const login = (user: User, token: string, isAdmin: boolean = false) => {
    setAuthData({ user, token, isAdmin });
  };

  const logout = () => {
    setAuthData(defaultAuth);
    sessionStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);