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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 pt-[env(safe-area-inset-top)] min-[390px]:p-4">
      <div className="max-h-[calc(100dvh-env(safe-area-inset-top)-1rem)] w-full max-w-[430px] overflow-y-auto rounded-t-[2rem] border border-white/15 bg-[#0c0b1d] p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-2xl min-[390px]:p-5">
        <div className="sticky top-0 z-10 mb-4 flex items-center justify-between gap-3 bg-[#0c0b1d]/95 pb-2 backdrop-blur">
          <h2 className="min-w-0 truncate text-lg font-black">{title}</h2>
          <VAButton variant="ghost" onClick={onClose}>
            Fechar
          </VAButton>
        </div>
        {children}
      </div>
    </div>
  );
}
