import { usePlayerBootstrap } from '../../lib/player';

export function PlayerBootstrapStatus() {
  const { status, player, retry } = usePlayerBootstrap();

  if (status === 'preview') {
    return <StatusShell tone="muted" title="Preview player" />;
  }

  if (status === 'synced' && player) {
    return <StatusShell tone="success" title="Player synced" detail={`${player.displayName} · ${player.accountStatus}`} />;
  }

  if (status === 'error') {
    return (
      <div className="rounded-xl border border-amber-300/20 bg-amber-400/10 px-2 py-1 text-right">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-100">Player sync unavailable</p>
        <button type="button" onClick={retry} className="text-[10px] font-black uppercase tracking-[.18em] text-cyan-100 underline decoration-cyan-200/40 underline-offset-2">
          Retry
        </button>
      </div>
    );
  }

  if (status === 'loading') {
    return <StatusShell tone="muted" title="Syncing player" />;
  }

  return null;
}

function StatusShell({ title, detail, tone }: { title: string; detail?: string; tone: 'muted' | 'success' }) {
  const toneClass = tone === 'success' ? 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100' : 'border-white/10 bg-white/5 text-white/60';
  return (
    <div className={`max-w-40 rounded-xl border px-2 py-1 text-right ${toneClass}`}>
      <p className="truncate text-[10px] font-bold uppercase tracking-[.18em]">{title}</p>
      {detail ? <p className="truncate text-[10px] text-white/70">{detail}</p> : null}
    </div>
  );
}
