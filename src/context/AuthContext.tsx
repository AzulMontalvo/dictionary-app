'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { tokens } from '@/lib/auth/tokens';
import { AuthResponse } from '@/types';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  roles: string[];
  userName: string | null;
  hydrated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Rehidratar estado desde localStorage al montar
    const savedRoles = tokens.getRoles();
    const hasToken = !!tokens.getAccess();
    setRoles(savedRoles);
    setIsAuthenticated(hasToken);
    setUserName(tokens.getUserName());
    setHydrated(true)
  }, []);

  function login(data: AuthResponse) {
    tokens.set(data.token, data.refreshToken, data.expiration, data.roles, data.userName);
    setRoles(data.roles);
    setIsAuthenticated(true);
    setUserName(data.userName);
  }

  function logout() {
    tokens.clear();
    setRoles([]);
    setIsAuthenticated(false);
    setUserName(null);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin: roles.includes('Admin'),
      roles,
      userName,
      hydrated,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}