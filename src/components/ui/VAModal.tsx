import type { ReactNode } from 'react';
import { VAButton } from './VAButton';

export function VAModal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-black/70 px-3 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] sm:px-4">
      <div className="flex max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1rem)] w-full max-w-[430px] flex-col rounded-t-[2rem] border border-white/15 bg-[#0c0b1d] p-5 shadow-2xl">
        <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
          <h2 className="min-w-0 truncate text-lg font-black">{title}</h2>
          <VAButton variant="ghost" onClick={onClose}>
            Fechar
          </VAButton>
        </div>
        <div className="va-scroll min-h-0 overflow-y-auto overscroll-contain pr-1">{children}</div>
      </div>
    </div>
  );
}
