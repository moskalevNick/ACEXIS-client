import React, { useState } from 'react';
import { Loader } from '../Loader/Loader';

type ImageType = {
  src: string;
  alt: string;
  className: string;
  effect: 'blur' | 'black-and-white' | 'opacity';
};

export const ImageWrapper: React.FC<ImageType> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <img alt={alt} src={src} className={className} onLoad={() => setIsLoading(false)} />
      )}
    </div>
  );
};
