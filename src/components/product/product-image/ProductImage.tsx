import Image from "next/image";

type ProductImageProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className: React.StyleHTMLAttributes<HTMLImageElement>["className"];
};

export const ProductImage = ({
  src,
  alt,
  width,
  height,
  className,
}: ProductImageProps) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={`w-20 h-20 object-cover rounded-md ${className}`}
    />
  );
};
