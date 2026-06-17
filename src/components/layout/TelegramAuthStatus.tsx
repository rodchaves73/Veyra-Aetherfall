import { useVeyraAuth } from '../../lib/auth';

const formatExpiresAt = (expiresAt: number) => {
  const epochMs = expiresAt < 1_000_000_000_000 ? expiresAt * 1000 : expiresAt;
  return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date(epochMs));
};

export function TelegramAuthStatus() {
  const auth = useVeyraAuth();

  if (auth.status === 'authenticated' && auth.session) {
    const user = auth.session.user;
    const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || `Telegram ${user.id}`;
    return (
      <div className="min-w-0 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 text-right leading-tight">
        <p className="truncate text-[9px] font-black uppercase tracking-wider text-emerald-100">Telegram Auth: Connected</p>
        <p className="truncate text-[11px] text-white">{displayName}</p>
        <p className="truncate text-[9px] text-emerald-100/70">expira {formatExpiresAt(auth.session.expiresAt)}</p>
      </div>
    );
  }

  if (auth.status === 'error') {
    return (
      <div className="min-w-0 rounded-2xl border border-amber-300/20 bg-amber-400/10 px-2 py-1 text-right leading-tight">
        <p className="truncate text-[9px] font-black uppercase tracking-wider text-amber-100">Telegram auth unavailable</p>
        <button type="button" onClick={auth.retryAuth} className="text-[11px] font-bold text-cyan-100 underline-offset-2 active:text-white">
          Retry
        </button>
      </div>
    );
  }

  if (auth.status === 'loading') {
    return <p className="truncate rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-2 py-1 text-[10px] font-bold text-cyan-100">Checking Telegram auth…</p>;
  }

  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 px-2 py-1 text-right leading-tight">
      <p className="truncate text-[9px] font-black uppercase tracking-wider text-violet-100/80">Preview mode</p>
      <p className="truncate text-[10px] text-violet-100/60">Open inside Telegram to authenticate</p>
    </div>
  );
}
