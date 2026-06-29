import { GameAssetImage } from '../components/assets/GameAssetImage';
import { VeyraPanel, VeyraScreen } from '../components/ui/VeyraVisual';
import { VAButton } from '../components/ui/VAButton';
import { tonSafetyCopy, shortenTonAddress } from '../lib/ton/tonConnect';
import { aetherFragmentsSafeCopy } from '../lib/economy/aetherFragments';
import type { PlayerState } from '../lib/rpg/types';
import { gameAssets } from '../lib/assets';

export function WalletScreen({ state }: { state: PlayerState }) { return <VeyraScreen><h2 className="text-2xl font-black">Wallet</h2><VeyraPanel className="text-center veyra-shimmer"><GameAssetImage src={gameAssets.icons.wallet.src} fallbackSrc={gameAssets.icons.wallet.fallbackSrc} alt="Wallet" className="mx-auto h-14 w-14" /><h3 className="mt-3 text-xl font-black">{state.wallet.connected ? 'Connected' : 'Disconnected'}</h3><p className="text-sm text-violet-100/60">{shortenTonAddress(state.wallet.address)}</p><VAButton className="mt-4" variant="secondary">Connect TON (prepared)</VAButton></VeyraPanel><VeyraPanel><h3 className="font-black">Pagamentos e saques futuros</h3><p className="mt-2 text-sm text-violet-100/70">{tonSafetyCopy}</p><p className="mt-2 text-sm text-amber-100/80">{aetherFragmentsSafeCopy}</p></VeyraPanel></VeyraScreen>; }
