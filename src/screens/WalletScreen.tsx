import { Wallet } from 'lucide-react';
import { VACard } from '../components/ui/VACard';
import { VAButton } from '../components/ui/VAButton';
import { tonSafetyCopy, shortenTonAddress } from '../lib/ton/tonConnect';
import { aetherFragmentsSafeCopy } from '../lib/economy/aetherFragments';
import type { PlayerState } from '../lib/rpg/types';

export function WalletScreen({ state }: { state: PlayerState }) { return <div className="space-y-4"><h2 className="text-2xl font-black">Wallet</h2><VACard className="text-center"><Wallet className="mx-auto text-cyan-200" size={42} /><h3 className="mt-3 text-xl font-black">{state.wallet.connected ? 'Connected' : 'Disconnected'}</h3><p className="text-sm text-violet-100/60">{shortenTonAddress(state.wallet.address)}</p><VAButton className="mt-4" variant="secondary">Connect TON (prepared)</VAButton></VACard><VACard><h3 className="font-black">Pagamentos e saques futuros</h3><p className="mt-2 text-sm text-violet-100/70">{tonSafetyCopy}</p><p className="mt-2 text-sm text-amber-100/80">{aetherFragmentsSafeCopy}</p></VACard></div>; }
