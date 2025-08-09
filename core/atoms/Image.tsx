// components/atoms/CMSImage.tsx
import { CMSImageField } from '../types/Fields';
import Image from 'next/image';

interface CMSImageProps {
  image: CMSImageField;
  alt?: string;
  className?: string;
  width?: string;
  height?: string;
}

export const CMSImage = (props: CMSImageProps) => {
  const image = props.image;
  return (
    <img
      src={image.url as string}
      alt={props.alt ?? image.filename as string}
      className={props.className}
      width={props.width}
      height={props.height}
      {...(image?.$.url ?? {} )}
    />
  );
};
