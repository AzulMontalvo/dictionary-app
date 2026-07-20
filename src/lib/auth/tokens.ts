const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRY_KEY = 'access_token_expiry';
const ROLES_KEY = 'roles';

export const tokens = {
  set(token: string, refreshToken: string, expiration: string, roles: string[]) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(EXPIRY_KEY, expiration);
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  },

  getAccess(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefresh(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getRoles(): string[] {
    const roles = localStorage.getItem(ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  },

  isExpiringSoon(): boolean {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!expiry) return true;
    const expiryMs = new Date(expiry).getTime();
    return expiryMs - Date.now() < 60_000; // menos de 1 minuto
  },

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    localStorage.removeItem(ROLES_KEY);
  }
};