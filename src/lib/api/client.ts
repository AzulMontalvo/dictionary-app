import { tokens } from '@/lib/auth/tokens';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


async function refreshTokens(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: tokens.getAccess(),
        refreshToken: tokens.getRefresh(),
      }),
    });

    if (!res.ok) {
      tokens.clear();
      return false;
    }

    const data = await res.json();
    tokens.set(data.token, data.refreshToken, data.expiration, data.roles);
    return true;
  } catch {
    tokens.clear();
    return false;
  }
}

interface FetchOptions extends RequestInit {
  auth?: boolean;   // ← true para endpoints protegidos
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { auth = false, ...fetchOptions } = options;

  if (auth && tokens.isExpiringSoon()) {
    const refreshed = await refreshTokens();
    if (!refreshed) throw new Error('Session expired');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(auth && tokens.getAccess()
      ? { Authorization: `Bearer ${tokens.getAccess()}` }
      : {}),
    ...fetchOptions.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
  const body = await res.json().catch(() => ({ message: res.statusText }));
  throw new Error(JSON.stringify(body));
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json();
}