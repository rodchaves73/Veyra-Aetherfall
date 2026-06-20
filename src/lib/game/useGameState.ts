import { useCallback, useEffect, useState } from 'react';
import { useVeyraAuth } from '../auth/useVeyraAuth';
import { fetchGameState } from './gameClient';
import type { GameState } from './gameTypes';
export const useGameState = () => {
  const { status, withAccessToken } = useVeyraAuth();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const refresh = useCallback(async () => {
    if (status !== 'authenticated') return;
    setLoading(true); setError(null);
    const data = await withAccessToken((token) => fetchGameState(token));
    if (data) setGameState(data); else setError('game_state_unavailable');
    setLoading(false);
  }, [status, withAccessToken]);
  useEffect(() => { const id = window.setTimeout(() => { void refresh(); }, 0); return () => window.clearTimeout(id); }, [refresh]);
  return { gameState, error, isLoading, refresh };
};
