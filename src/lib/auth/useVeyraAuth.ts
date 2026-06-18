import { createContext, useContext } from 'react';
import type { VeyraAuthState } from './veyraAuthTypes';

export type VeyraAuthContextValue = VeyraAuthState & {
  retryAuth: () => void;
  clearAuth: () => void;
  withAccessToken: <T>(callback: (token: string) => Promise<T>) => Promise<T | null>;
};

export const VeyraAuthContext = createContext<VeyraAuthContextValue | null>(null);

export const useVeyraAuth = () => {
  const context = useContext(VeyraAuthContext);
  if (!context) throw new Error('useVeyraAuth must be used inside VeyraAuthProvider');
  return context;
};
