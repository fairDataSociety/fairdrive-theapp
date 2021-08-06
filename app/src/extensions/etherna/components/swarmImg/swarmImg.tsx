import React, { useEffect, useState } from 'react';

import useStyles from './swarmImgStyles';
import SwarmImageReader from '../../classes/swarm-image/swarm-image-reader';

interface Props {
  image?: string | SwarmImageReader;
  fallback?: string;
  className?: string;
  alt?: string;
  preserveAspectRatio?: boolean;
  style?: React.CSSProperties;
}

const SwarmImg = ({
  image,
  fallback,
  alt,
  preserveAspectRatio,
  style,
}: Props): JSX.Element => {
  const [src, setSrc] = useState<string>();
  const [size, setSize] = useState<number>();
  const [imgLoaded, setImgLoaded] = useState(typeof image === 'string');

  const classes = useStyles();

  const imagePreload =
    image instanceof SwarmImageReader ? image.blurredBase64 : fallback;

  useEffect(() => {
    if (image && size) {
      const src =
        image instanceof SwarmImageReader ? image.getOptimizedSrc(size) : image;
      setSrc(src);
      setImgLoaded(false);
    }
  }, [image, size]);

  const onLoadImage = () => {
    setImgLoaded(true);
  };

  const onError = () => {
    if (fallback || imagePreload) {
      setSrc(fallback || imagePreload);
    }
  };

  return (
    <div
      className={classes.swarmImage}
      ref={(el) => {
        if (el && el.clientWidth !== size) {
          setSize(el.clientWidth);
        }
      }}
    >
      {!imgLoaded && imagePreload && (
        <img
          className={classes.swarmImagePreview}
          src={imagePreload}
          alt={alt}
          style={style}
          ref={(el) => {
            if (
              el &&
              preserveAspectRatio &&
              size &&
              image instanceof SwarmImageReader
            ) {
              const [width, height] = image.originalImageSize ?? [1, 1];
              const aspectRatio = height / width;
              el.style.height = `${el.clientWidth * aspectRatio} px`;
            }
          }}
        />
      )}
      {src && (
        <picture
          className={classes.swarmImagePicture}
          onError={onError}
          onLoad={onLoadImage}
        >
          <img
            src={src}
            alt={alt}
            style={style}
            className={classes.swarmImageObject}
            loading="lazy"
          />
        </picture>
      )}
    </div>
  );
};

export default SwarmImg;
