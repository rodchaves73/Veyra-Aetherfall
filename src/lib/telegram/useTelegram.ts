import { useEffect, useMemo } from 'react';
import type { TelegramWebAppUser } from './telegramTypes';

export const useTelegram = () => {
  const webApp = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

  useEffect(() => {
    if (!webApp) return;
    webApp.ready();
    webApp.expand();
  }, [webApp]);

  return useMemo(() => {
    const devId = import.meta.env.VITE_DEV_TELEGRAM_ID;
    const devUser: TelegramWebAppUser | undefined = devId
      ? { id: Number(devId), first_name: 'Dev', username: 'veyra_dev' }
      : undefined;

    return {
      isTelegram: Boolean(webApp),
      webApp,
      initData: webApp?.initData ?? '',
      user: webApp?.initDataUnsafe?.user ?? devUser,
      colorScheme: webApp?.colorScheme ?? 'dark',
      themeParams: webApp?.themeParams ?? {},
      warning: 'initDataUnsafe é apenas UI. Telegram initData deve ser validado server-side antes de sessão real.',
    };
  }, [webApp]);
};
