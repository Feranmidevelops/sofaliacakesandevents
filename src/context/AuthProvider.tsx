import React, { useState } from 'react';
import { AuthContext } from './authContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('adminAuthenticated') === 'true'
  );

  const authenticate = () => {
    sessionStorage.setItem('adminAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
