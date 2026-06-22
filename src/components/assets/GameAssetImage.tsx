import { useEffect, useMemo, useState, type ImgHTMLAttributes } from 'react';

import { gameAssets } from '../../lib/assets';

type BaseImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'loading' | 'src'>;

type GameAssetImageProps = BaseImageProps & {
  src?: string;
  fallbackSrc?: string;
  loading?: 'eager' | 'lazy';
} & ({ decorative: true; alt?: '' } | { decorative?: false; alt: string });

const resolveImageSrc = (src: string | undefined, fallbackSrc: string) => {
  const safeSrc = src?.trim();
  return safeSrc && safeSrc.length > 0 ? safeSrc : fallbackSrc;
};

export function GameAssetImage({
  src,
  fallbackSrc = gameAssets.placeholders.icon.src,
  alt,
  decorative = false,
  className,
  loading = 'lazy',
  ...imageProps
}: GameAssetImageProps) {
  const safeSrc = useMemo(() => resolveImageSrc(src, fallbackSrc), [src, fallbackSrc]);
  const [currentSrc, setCurrentSrc] = useState(safeSrc);

  useEffect(() => {
    setCurrentSrc(safeSrc);
  }, [safeSrc]);

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
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      style={{ maxWidth: '100%', ...imageProps.style }}
    />
  );
}
