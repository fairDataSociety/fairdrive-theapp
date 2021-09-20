import React, { useEffect, useState, useContext } from 'react';
// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';

import { FilePreviewInfo } from './types';
import useStyles from './filePreviewStyles';
import { previewFile } from 'src/services/file';

type Props = FilePreviewInfo;

const FilePreviewImage = ({
  filename,
  directory,
  podName,
}: Props): JSX.Element => {
  // General
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  const [src, setSrc] = useState<string>();

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
