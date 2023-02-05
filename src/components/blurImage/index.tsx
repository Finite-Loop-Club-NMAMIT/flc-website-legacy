import Image from "next/image";
import { type FunctionComponent, useState } from "react";

interface BlurImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
  priority?: boolean;
}

const BlurImage: FunctionComponent<BlurImageProps> = (props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={`${props.className as string} duration-700 ease-in-out ${
        isLoading
          ? "scale-110 blur-lg grayscale"
          : "scale-100 blur-0 grayscale-0"
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default BlurImage;
