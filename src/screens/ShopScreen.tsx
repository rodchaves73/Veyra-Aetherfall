import { useState } from 'react';
import { shopProducts } from '../data/shopProducts';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VABadge } from '../components/ui/VABadge';

export function ShopScreen() {
  const [category, setCategory] = useState('Free');
  const categories = ['Free', 'Ads', 'Gems', 'Stars', 'TON', 'Battle Pass', 'Bundles', 'Stamina', 'Materials', 'Summons'];

  return (
    <div className="min-w-0 space-y-4 overflow-x-hidden">
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
          <VACard key={product.id}>
            <div className="flex min-w-0 flex-col gap-3 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
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
          </VACard>
        ))}
      <p className="break-words text-xs text-amber-100/75">Pagamentos reais, Stars e TON não creditam rewards no cliente. Validação server-side obrigatória.</p>
    </div>
  );
}
