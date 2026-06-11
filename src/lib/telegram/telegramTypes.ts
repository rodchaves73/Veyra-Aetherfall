export type TelegramWebAppUser = { id: number; first_name?: string; last_name?: string; username?: string; language_code?: string };
export type TelegramWebApp = {
  initData: string;
  initDataUnsafe?: { user?: TelegramWebAppUser };
  colorScheme?: 'light' | 'dark';
  themeParams?: Record<string, string>;
  ready: () => void;
  expand: () => void;
};
declare global { interface Window { Telegram?: { WebApp?: TelegramWebApp }; show_9031076?: () => Promise<void>; } }
