import { Platform } from 'react-native';

import { AuthSession } from './types';

const SESSION_KEY = 'quitloop.session';

async function store() {
  if (Platform.OS === 'web') {
    return {
      get: async (key: string) =>
        typeof localStorage === 'undefined' ? null : localStorage.getItem(key),
      set: async (key: string, value: string) => localStorage.setItem(key, value),
      remove: async (key: string) => localStorage.removeItem(key),
    };
  }

  const SecureStore = await import('expo-secure-store');
  return {
    get: (key: string) => SecureStore.getItemAsync(key),
    set: (key: string, value: string) => SecureStore.setItemAsync(key, value),
    remove: (key: string) => SecureStore.deleteItemAsync(key),
  };
}

export async function readSession(): Promise<AuthSession | null> {
  const raw = await (await store()).get(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const session = JSON.parse(raw) as AuthSession;
    if (!session.token || !session.user?.email) {
      return null;
    }

    if (session.expiresAt && Date.parse(session.expiresAt) <= Date.now()) {
      await clearSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function writeSession(session: AuthSession) {
  await (await store()).set(SESSION_KEY, JSON.stringify(session));
}

export async function clearSession() {
  await (await store()).remove(SESSION_KEY);
}
