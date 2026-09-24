import { apiBaseUrl } from '../config';
import { AuthSession, ForgotPasswordResult } from './types';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ErrorBody = {
  error?: string;
  message?: string;
};

async function request<T>(path: string, options: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      Accept: 'application/json',
      ...(rest.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = (await response.json().catch(() => ({}))) as T & ErrorBody;
  if (!response.ok) {
    throw new ApiError(
      response.status,
      body.error ?? body.message ?? 'Something went wrong. Try again.',
    );
  }

  return body;
}

export function signUp(input: { email: string; password: string; displayName?: string }) {
  return request<AuthSession>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function login(input: { email: string; password: string }) {
  return request<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function forgotPassword(email: string) {
  return request<ForgotPasswordResult>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(input: { token: string; password: string }) {
  return request<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function logout(token: string) {
  return request<void>('/auth/logout', { method: 'POST', token });
}

export function firstNameFrom(user: Pick<AuthSession['user'], 'displayName' | 'email'>) {
  const source = user.displayName.trim() || user.email.split('@')[0] || 'there';
  return source.split(/\s+/)[0] ?? 'there';
}

export function initialsFrom(user: Pick<AuthSession['user'], 'displayName' | 'email'>) {
  const name = user.displayName.trim() || user.email;
  const parts = name.split(/[\s@.]+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? 'Q') + (parts[1]?.[0] ?? '');
  return letters.toUpperCase();
}
