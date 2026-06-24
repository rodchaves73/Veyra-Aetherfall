import { useEffect, useState, type ReactNode } from 'react';

import { gameAssets } from '../../lib/assets';

type GameBackgroundProps = {
  src?: string;
  fallbackSrc?: string;
  overlay?: boolean;
  children?: ReactNode;
  className?: string;
};

export function GameBackground({
  src = gameAssets.placeholders.background.src,
  fallbackSrc = gameAssets.placeholders.background.src,
  overlay = true,
  children,
  className = '',
}: GameBackgroundProps) {
  const safeFallbackSrc = fallbackSrc || gameAssets.placeholders.background.src;
  const requestedSrc = src || safeFallbackSrc;
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const resolvedSrc = loadedSrc === requestedSrc ? loadedSrc : safeFallbackSrc;

  useEffect(() => {
    let isActive = true;

    if (!requestedSrc || requestedSrc === safeFallbackSrc) {
      return () => {
        isActive = false;
      };
    }

    const image = new Image();

    image.onload = () => {
      if (isActive) {
        setLoadedSrc(requestedSrc);
      }
    };

    image.onerror = () => {
      if (isActive) {
        setLoadedSrc(null);
      }
    };

    image.src = requestedSrc;

    return () => {
      isActive = false;
      image.onload = null;
      image.onerror = null;
    };
  }, [requestedSrc, safeFallbackSrc]);

  const backgroundImage = `linear-gradient(rgba(5, 6, 18, 0.2), rgba(5, 6, 18, 0.82)), url(${resolvedSrc})`;

  return (
    <section
      className={`veyra-game-background ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minHeight: '100%',
        overflowX: 'hidden',
        backgroundImage,
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {overlay ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.2), transparent 38%)',
          }}
        />
      ) : null}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </section>
  );
}
