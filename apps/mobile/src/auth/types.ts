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

export type ForgotPasswordResult = {
  message: string;
  devResetToken?: string | null;
};
