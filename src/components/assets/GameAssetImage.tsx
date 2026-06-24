import { useEffect, useState, type ImgHTMLAttributes } from 'react';

import { gameAssets } from '../../lib/assets';

type BaseImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'loading' | 'src'>;

type GameAssetImageProps = BaseImageProps & {
  src?: string;
  fallbackSrc?: string;
  loading?: 'eager' | 'lazy';
} & ({ decorative: true; alt?: '' } | { decorative?: false; alt: string });

export function GameAssetImage({
  src,
  fallbackSrc = gameAssets.placeholders.icon.src,
  alt,
  decorative = false,
  className,
  loading = 'lazy',
  ...imageProps
}: GameAssetImageProps) {
  const safeFallbackSrc = fallbackSrc || gameAssets.placeholders.icon.src;
  const requestedSrc = src || safeFallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(requestedSrc);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (isActive) {
        setCurrentSrc(requestedSrc);
      }
    });

    return () => {
      isActive = false;
    };
  }, [requestedSrc, safeFallbackSrc]);

  return (
    <img
      {...imageProps}
      src={currentSrc}
      alt={decorative ? '' : alt}
      aria-hidden={decorative || undefined}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => {
        if (currentSrc !== safeFallbackSrc) {
          setCurrentSrc(safeFallbackSrc);
        }
      }}
      style={{ maxWidth: '100%', ...imageProps.style }}
    />
  );
}
