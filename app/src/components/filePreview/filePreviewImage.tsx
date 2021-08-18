import React, { useEffect, useState } from 'react';

import { FilePreviewInfo } from './types';
import useStyles from './filePreviewStyles';
import { previewFile } from 'src/services/file';

type Props = FilePreviewInfo;

const FilePreviewImage = ({
  filename,
  directory,
  podName,
}: Props): JSX.Element => {
  const [src, setSrc] = useState<string>();
  const classes = useStyles();

  useEffect(() => {
    loadImage();

    return () => unloadImage();
  }, []);

  const loadImage = async () => {
    const imgSrc = window.URL.createObjectURL(
      await previewFile(filename, directory, podName)
    );
    setSrc(imgSrc);
  };

  const unloadImage = () => {
    URL.revokeObjectURL(src);
  };

  if (!src) return null;

  return <img className={classes.imagePreview} src={src}></img>;
};

export default FilePreviewImage;
