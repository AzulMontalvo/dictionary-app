'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { tokens } from '@/lib/auth/tokens';
import { AuthResponse } from '@/types';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  roles: string[];
  hydrated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Rehidratar estado desde localStorage al montar
    const savedRoles = tokens.getRoles();
    const hasToken = !!tokens.getAccess();
    setRoles(savedRoles);
    setIsAuthenticated(hasToken);
    setHydrated(true)
  }, []);

  function login(data: AuthResponse) {
    tokens.set(data.token, data.refreshToken, data.expiration, data.roles);
    setRoles(data.roles);
    setIsAuthenticated(true);
  }

  function logout() {
    tokens.clear();
    setRoles([]);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin: roles.includes('Admin'),
      roles,
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