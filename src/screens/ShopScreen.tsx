import { useState } from 'react';
import { shopProducts } from '../data/shopProducts';
import { VAButton } from '../components/ui/VAButton';
import { GameAssetImage } from '../components/assets/GameAssetImage';
import { VeyraPanel, VeyraScreen } from '../components/ui/VeyraVisual';
import { VABadge } from '../components/ui/VABadge';
import { gameAssets } from '../lib/assets';

export function ShopScreen() {
  const [category, setCategory] = useState('Free');
  const categories = ['Free', 'Ads', 'Gems', 'Stars', 'TON', 'Battle Pass', 'Bundles', 'Stamina', 'Materials', 'Summons'];

  return (
    <VeyraScreen>
      <h2 className="text-2xl font-black">Shop</h2>
      <div className="va-scroll -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-bold ${category === item ? 'bg-cyan-500/80' : 'bg-white/10'}`}
          >
            {item}
          </button>
        ))}
      </div>
      {shopProducts
        .filter((p) => p.category === category || (category === 'Bundles' && p.category === 'Stars'))
        .map((product) => (
          <VeyraPanel key={product.id} className="veyra-reward-shine">
            <GameAssetImage decorative src={gameAssets.banners.beginner.src} fallbackSrc={gameAssets.banners.beginner.fallbackSrc} className="mb-3 h-20 w-full rounded-2xl object-cover opacity-80" /><div className="flex min-w-0 flex-col gap-3 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
              <div className="min-w-0">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h3 className="break-words font-black">{product.name}</h3>
                  <VABadge>{product.badge}</VABadge>
                </div>
                <p className="break-words text-sm text-violet-100/60">
                  Provider: {product.provider} • Limit: {product.limit}
                </p>
                <p className="break-words text-xs text-cyan-100/70">Rewards: {product.rewards.join(', ')}</p>
              </div>
              <VAButton variant={product.badge === 'coming soon' ? 'secondary' : 'primary'}>{product.price}</VAButton>
            </div>
          </VeyraPanel>
        ))}
      <p className="break-words text-xs text-amber-100/75">Pagamentos reais, Stars e TON não creditam rewards no cliente. Validação server-side obrigatória.</p>
    </VeyraScreen>
  );
}
