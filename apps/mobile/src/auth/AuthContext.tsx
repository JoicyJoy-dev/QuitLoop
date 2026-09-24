import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import * as authApi from './api';
import { clearSession, readSession, writeSession } from './session';
import { AuthSession, AuthUser, ForgotPasswordResult } from './types';

type AuthContextValue = {
  status: 'loading' | 'signedOut' | 'signedIn';
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: { email: string; password: string; displayName?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<ForgotPasswordResult>;
  confirmPasswordReset: (token: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthContextValue['status']>('loading');
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let active = true;
    readSession()
      .then((stored) => {
        if (!active) {
          return;
        }
        setSession(stored);
        setStatus(stored ? 'signedIn' : 'signedOut');
      })
      .catch(() => {
        if (active) {
          setStatus('signedOut');
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user: session?.user ?? null,
      signIn: async (email, password) => {
        const next = await authApi.login({ email, password });
        await writeSession(next);
        setSession(next);
        setStatus('signedIn');
      },
      signUp: async (input) => {
        const next = await authApi.signUp(input);
        await writeSession(next);
        setSession(next);
        setStatus('signedIn');
      },
      signOut: async () => {
        if (session) {
          await authApi.logout(session.token).catch(() => undefined);
        }
        await clearSession();
        setSession(null);
        setStatus('signedOut');
      },
      requestPasswordReset: (email) => authApi.forgotPassword(email),
      confirmPasswordReset: async (token, password) => {
        await authApi.resetPassword({ token, password });
      },
    }),
    [session, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return value;
}
