export type VeyraPlayerAccountStatus = 'active' | 'limited' | 'banned' | 'deleted';

export type VeyraPlayerOnboardingStatus = 'new' | 'started' | 'completed' | 'skipped';

export type VeyraPlayerProfile = {
  level: number;
  xp: number;
  powerScore: number;
  campaignChapter: number;
  campaignStage: number;
  onboardingStatus: VeyraPlayerOnboardingStatus;
  lastBootstrapAt: string | null;
};

export type VeyraPlayer = {
  id: string;
  telegramUserId: number;
  displayName: string;
  accountStatus: VeyraPlayerAccountStatus;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string;
  profile: VeyraPlayerProfile;
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
