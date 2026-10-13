import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface AttractionImageProps {
  src: string;
  alt: string;
  className?: string;
}

const fallbackIcon = (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1b2a4a] to-[#324d78]">
    <div className="text-center">
      <ImageOff size={32} className="mx-auto text-cream/40" />
      <p className="mt-2 text-xs text-cream/50 px-4">Image unavailable</p>
    </div>
  </div>
);

export default function AttractionImage({ src, alt, className = '' }: AttractionImageProps) {
  const [errored, setErrored] = useState(false);
  if (errored) return fallbackIcon;
  return <img src={src} alt={alt} className={className} style={{ objectFit: 'cover' }} onError={() => setErrored(true)} />;
}
