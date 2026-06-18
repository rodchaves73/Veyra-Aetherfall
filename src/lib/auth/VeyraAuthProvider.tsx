import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { authenticateTelegram, verifyTelegramSession } from './veyraAuthClient';
import { VeyraAuthContext } from './useVeyraAuth';
import type { VeyraAuthClientError, VeyraAuthState } from './veyraAuthTypes';

const previewState = (isTelegramMiniApp: boolean): VeyraAuthState => ({ status: 'unauthenticated', isTelegramMiniApp, isAuthenticated: false, session: null, errorCode: null, errorMessage: null });
const errorState = (isTelegramMiniApp: boolean, error: VeyraAuthClientError): VeyraAuthState => ({ status: 'error', isTelegramMiniApp, isAuthenticated: false, session: null, errorCode: error.code, errorMessage: error.message });
const getTelegramWebApp = () => window.Telegram?.WebApp;

export function VeyraAuthProvider({ children }: { children: ReactNode }) {
  const tokenRef = useRef<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);
  const [state, setState] = useState<VeyraAuthState>(() => previewState(Boolean(getTelegramWebApp())));

  const clearAuth = useCallback(() => {
    tokenRef.current = null;
    setState(previewState(Boolean(getTelegramWebApp())));
  }, []);

  const retryAuth = useCallback(() => {
    tokenRef.current = null;
    setRetryNonce((value) => value + 1);
  }, []);

  const withAccessToken = useCallback(async <T,>(callback: (token: string) => Promise<T>): Promise<T | null> => {
    const token = tokenRef.current;
    if (!token) return null;
    return callback(token);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const webApp = getTelegramWebApp();
    const isTelegramMiniApp = Boolean(webApp);
    const initData = webApp?.initData ?? '';

    if (!initData) {
      tokenRef.current = null;
      queueMicrotask(() => {
        if (!cancelled) setState(previewState(isTelegramMiniApp));
      });
      return;
    }

    const runAuth = async () => {
      setState({ ...previewState(isTelegramMiniApp), status: 'loading' });
      const authResult = await authenticateTelegram(initData);
      if (cancelled) return;
      if (authResult.error) {
        tokenRef.current = null;
        setState(errorState(isTelegramMiniApp, authResult.error));
        return;
      }
      tokenRef.current = authResult.data.accessToken;
      const sessionResult = await verifyTelegramSession(authResult.data.accessToken);
      if (cancelled) return;
      if (sessionResult.error) {
        tokenRef.current = null;
        setState(errorState(isTelegramMiniApp, sessionResult.error));
        return;
      }
      setState({ status: 'authenticated', isTelegramMiniApp, isAuthenticated: true, session: sessionResult.data, errorCode: null, errorMessage: null });
    };

    void runAuth();
    return () => { cancelled = true; };
  }, [retryNonce]);

  const value = useMemo(() => ({ ...state, retryAuth, clearAuth, withAccessToken }), [clearAuth, retryAuth, state, withAccessToken]);
  return <VeyraAuthContext.Provider value={value}>{children}</VeyraAuthContext.Provider>;
}
