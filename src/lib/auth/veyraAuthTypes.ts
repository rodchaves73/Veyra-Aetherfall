export type VeyraAuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export type VeyraTelegramUser = {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  photoUrl?: string;
};

export type VeyraAuthSession = {
  source: 'telegram';
  expiresAt: number;
  user: VeyraTelegramUser;
};

export type VeyraAuthState = {
  status: VeyraAuthStatus;
  isTelegramMiniApp: boolean;
  isAuthenticated: boolean;
  session: VeyraAuthSession | null;
  errorCode: string | null;
  errorMessage: string | null;
};

export type VeyraAuthResult = {
  accessToken: string;
  session: VeyraAuthSession;
};

export type VeyraAuthErrorCode =
  | 'supabase_not_configured'
  | 'missing_init_data'
  | 'network_error'
  | 'invalid_response'
  | 'auth_unavailable'
  | 'session_unavailable';

export type VeyraAuthClientError = {
  code: VeyraAuthErrorCode;
  message: string;
};
