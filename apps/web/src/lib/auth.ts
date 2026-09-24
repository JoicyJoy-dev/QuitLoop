export const SESSION_KEY = "quitloop-session";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  countryCode: string;
  currencyCode: string;
  languageCode: string;
  timeZone: string;
  unitSystem: string;
};

export type AuthSession = {
  token: string;
  expiresAt: string;
  user: AuthUser;
};

export function readSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }

    const session = JSON.parse(raw) as AuthSession;
    if (!session.token || !session.user?.email) {
      return null;
    }

    if (session.expiresAt && Date.parse(session.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function writeSession(session: AuthSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function firstNameFrom(user: Pick<AuthUser, "displayName" | "email">) {
  const source = user.displayName.trim() || user.email.split("@")[0] || "there";
  return source.split(/\s+/)[0] ?? "there";
}
