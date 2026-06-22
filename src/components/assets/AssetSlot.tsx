import { GameAssetImage } from './GameAssetImage';
import { gameAssets, type GameAssetCategory } from '../../lib/assets';

type AssetSlotProps = {
  label: string;
  type: GameAssetCategory;
  src?: string;
  fallbackSrc?: string;
  className?: string;
};

export function AssetSlot({ label, type, src, fallbackSrc = gameAssets.placeholders.icon.src, className = '' }: AssetSlotProps) {
  return (
    <div
      className={`veyra-asset-slot ${className}`.trim()}
      style={{
        display: 'grid',
        gap: '0.5rem',
        placeItems: 'center',
        minHeight: '6rem',
        padding: '0.75rem',
        border: '1px dashed rgba(148, 163, 184, 0.45)',
        borderRadius: '1rem',
        background: 'rgba(15, 23, 42, 0.42)',
        textAlign: 'center',
      }}
    >
      <GameAssetImage src={src || fallbackSrc} fallbackSrc={fallbackSrc} alt={`${label} (${type})`} style={{ width: '3rem', height: '3rem', objectFit: 'contain' }} />
      <span style={{ fontSize: '0.75rem', color: 'rgba(226, 232, 240, 0.78)' }}>{label}</span>
    </div>
  );
}
