import { useCallback, useEffect, useState } from 'react';
import { useVeyraAuth } from '../auth';
import { bootstrapPlayer } from './playerClient';
import type { PlayerBootstrapError, VeyraPlayer } from './playerTypes';

type PlayerBootstrapStatus = 'preview' | 'idle' | 'loading' | 'synced' | 'error';

export type UsePlayerBootstrapResult = {
  status: PlayerBootstrapStatus;
  player: VeyraPlayer | null;
  error: PlayerBootstrapError | null;
  retry: () => void;
};

export function usePlayerBootstrap(): UsePlayerBootstrapResult {
  const auth = useVeyraAuth();
  const [player, setPlayer] = useState<VeyraPlayer | null>(null);
  const [error, setError] = useState<PlayerBootstrapError | null>(null);
  const [status, setStatus] = useState<PlayerBootstrapStatus>('idle');
  const [retryNonce, setRetryNonce] = useState(0);

  const retry = useCallback(() => setRetryNonce((value) => value + 1), []);

  useEffect(() => {
    let cancelled = false;

    if (!auth.isTelegramMiniApp) {
      queueMicrotask(() => {
        if (!cancelled) {
          setPlayer(null);
          setError(null);
          setStatus('preview');
        }
      });
      return;
    }

    if (!auth.isAuthenticated || !auth.withAccessToken) {
      queueMicrotask(() => {
        if (!cancelled) {
          setPlayer(null);
          setError(null);
          setStatus(auth.status === 'loading' ? 'loading' : 'idle');
        }
      });
      return;
    }

    const run = async () => {
      setStatus('loading');
      setError(null);
      const result = await auth.withAccessToken((token) => bootstrapPlayer(token));
      if (cancelled) return;
      if (!result) {
        setPlayer(null);
        setStatus('idle');
        return;
      }
      if (result.error) {
        setPlayer(null);
        setError(result.error);
        setStatus('error');
        return;
      }
      setPlayer(result.data);
      setStatus('synced');
    };

    void run();
    return () => { cancelled = true; };
  }, [auth, retryNonce]);

  return { status, player, error, retry };
}
