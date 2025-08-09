import React from 'react';
import { ImageProps } from '@/core/types/Props';
import { CMSImage } from '@/core/atoms/Image';

export default function ImageComponent(props: ImageProps) {

  const image = props.image.image;
  
  return (
     <div>
        <CMSImage image={image} />
     </div>
  );
}