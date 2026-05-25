import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
