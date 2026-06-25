import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

function toWebp(src: string) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

export default function Picture({ src, alt, width, height, priority = false, className, style }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <picture className={`pic-wrap${loaded ? " pic-loaded" : ""}`}>
      <source srcSet={toWebp(src)} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={className}
        style={style}
      />
    </picture>
  );
}
