import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import { useDropzone } from 'react-dropzone';
import useStyles from '../../../../rightSidebarStyles';

// Components
import { UploadIcon } from 'src/components/icons/icons';

export interface Props {
  setFilesToUpload: (files: File[]) => void;
}

const UploadDropzone = (props: Props): JSX.Element => {
  // General
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      props.setFilesToUpload(acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <div className={classes.uploadBlockWrapper}>
      <div {...getRootProps({ className: classes.uploadBlock })}>
        <input {...getInputProps()} />
        <div className={classes.uploadIcon}>
          <UploadIcon />
        </div>
        <p className={classes.uploadText}>Click or drag here to upload</p>
      </div>
    </div>
  );
};

export default React.memo(UploadDropzone);
