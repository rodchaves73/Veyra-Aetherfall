import type { HTMLAttributes } from 'react';
import { cn } from './utils';
export function VACard({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('rounded-3xl border border-white/10 bg-slate-950/62 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl', className)} {...props} />; }
