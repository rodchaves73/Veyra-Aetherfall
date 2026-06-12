import { useMemo, useState } from 'react';
import { shopProducts } from '../data/shopProducts';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VABadge } from '../components/ui/VABadge';

const categories = ['Free', 'Ads', 'Gems', 'Stars', 'TON', 'Battle Pass', 'Bundles', 'Stamina', 'Materials', 'Summons'];

export function ShopScreen() {
  const [category, setCategory] = useState('Free');
  const products = useMemo(
    () => shopProducts.filter((product) => product.category === category || (category === 'Bundles' && product.category === 'Stars')),
    [category],
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black">Shop</h2>
        <p className="text-sm text-violet-100/60">Categorias separadas para free, ads, gems, Stars e TON.</p>
      </div>
      <div className="va-scroll -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 min-[390px]:-mx-4 min-[390px]:px-4">
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
      {products.length === 0 ? (
        <VACard>
          <p className="text-sm text-violet-100/70">Categoria preparada para conteúdo futuro. Nenhuma compra real é executada no cliente.</p>
        </VACard>
      ) : (
        products.map((product) => (
          <VACard key={product.id}>
            <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black">{product.name}</h3>
                  <VABadge>{product.badge}</VABadge>
                </div>
                <p className="text-sm text-violet-100/60">Provider: {product.provider} • Limit: {product.limit}</p>
                <p className="break-words text-xs text-cyan-100/70">Rewards: {product.rewards.join(', ')}</p>
              </div>
              <VAButton className="w-full shrink-0 min-[390px]:w-auto" variant={product.badge === 'coming soon' ? 'secondary' : 'primary'}>
                {product.price}
              </VAButton>
            </div>
          </VACard>
        ))
      )}
      <p className="text-xs text-amber-100/75">Pagamentos reais, Stars e TON não creditam rewards no cliente. Validação server-side obrigatória.</p>
    </div>
  );
}
