import React, { useEffect, useState, useContext } from 'react';
// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

import { FileProviderContext } from 'src/machines/file';

import { FilePreviewInfo } from './types';
import useStyles from './filePreviewStyles';

type Props = FilePreviewInfo;

const FilePreviewImage = ({ filename }: Props): JSX.Element => {
  // General
  const { FileMachineStore, FileMachineActions } =
    useContext(FileProviderContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    loadImage();

    return () => unloadImage();
  }, [filename]);

  const loadImage = () => {
    FileMachineActions.onPreviewFile(filename);
  };

  useEffect(() => {
    if (FileMachineStore.context.fileResultBlob) {
      const imgSrc = window.URL.createObjectURL(
        FileMachineStore.context.fileResultBlob
      );
      setSrc(imgSrc);
    }
  }, [FileMachineStore]);

  const unloadImage = () => {
    URL.revokeObjectURL(src);
  };

  if (!src) return null;

  return <img className={classes.imagePreview} src={src}></img>;
};

export default FilePreviewImage;
