export type VeyraPlayerAccountStatus = 'active' | 'limited' | 'banned' | 'deleted';

export type VeyraPlayer = {
  id: string;
  telegramUserId: number;
  displayName: string;
  accountStatus: VeyraPlayerAccountStatus;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string;
};

export type PlayerBootstrapErrorCode =
  | 'supabase_not_configured'
  | 'missing_access_token'
  | 'network_error'
  | 'invalid_response'
  | 'player_bootstrap_unavailable';

export type PlayerBootstrapError = {
  code: PlayerBootstrapErrorCode;
  message: string;
};

export type PlayerBootstrapResult =
  | { data: VeyraPlayer; error: null }
  | { data: null; error: PlayerBootstrapError };
