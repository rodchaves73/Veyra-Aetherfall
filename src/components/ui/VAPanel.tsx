import type { HTMLAttributes } from 'react';
import { cn } from './utils';
export function VAPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <section className={cn('rounded-[2rem] border border-violet-300/15 bg-gradient-to-br from-white/[.10] to-white/[.03] p-4 backdrop-blur-md', className)} {...props} />; }
