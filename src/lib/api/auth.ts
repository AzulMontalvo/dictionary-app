import { apiFetch } from '@/lib/api/client';
import { AuthResponse } from '@/types';

export interface RegisterRequest {
  username:string;
  email: string;
  password: string;
  // role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  register(data: RegisterRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login(data: LoginRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  revoke(): Promise<void> {
    return apiFetch<void>('/auth/revoke-token', {
      method: 'POST',
      auth: true,
    });
  },
};