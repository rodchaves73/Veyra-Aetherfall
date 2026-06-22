import type { ReactNode } from 'react';

import { gameAssets, type AssetRarity } from '../../lib/assets';
import { GameAssetImage } from './GameAssetImage';

type RarityFrameProps = {
  rarity: AssetRarity;
  children: ReactNode;
  frameSrc?: string;
  className?: string;
};

export function RarityFrame({ rarity, children, frameSrc, className = '' }: RarityFrameProps) {
  const fallbackFrame = gameAssets.frames[rarity].fallbackSrc;

  return (
    <div className={`veyra-rarity-${rarity} ${className}`.trim()} style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
      {frameSrc ? (
        <GameAssetImage
          src={frameSrc}
          fallbackSrc={fallbackFrame}
          decorative
          className="veyra-rarity-frame-image"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none' }}
        />
      ) : null}
    </div>
  );
}
