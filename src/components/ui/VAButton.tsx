import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from './utils';

export function VAButton({ className, variant = 'primary', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; children: ReactNode }) {
  const variants = { primary: 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_24px_rgba(124,58,237,.35)]', secondary: 'bg-white/10 text-violet-100 border border-white/15', danger: 'bg-gradient-to-r from-rose-700 to-red-500 text-white', ghost: 'bg-transparent text-violet-100' };
  return <button className={cn('min-h-11 rounded-2xl px-4 py-2 text-sm font-bold transition active:scale-[.98] disabled:opacity-50', variants[variant], className)} {...props}>{children}</button>;
}
