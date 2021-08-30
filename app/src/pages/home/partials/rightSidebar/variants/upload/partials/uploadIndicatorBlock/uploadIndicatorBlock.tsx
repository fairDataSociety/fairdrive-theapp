import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import { useDropzone } from 'react-dropzone';
import useStyles from '../../../../rightSidebarStyles';

// Components
import { UploadIcon, Close } from 'src/components/icons/icons';

export interface Props {
  //   handleFileUpload: (files: FileList) => void;
}

const UploadDropzone = (): JSX.Element => {
  // General
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // Handle display of selected files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setSelectedFiles(acceptedFiles);
    }
  }, [acceptedFiles]);

  const removeFile = (index: number): void => {
    const copy = [...selectedFiles];
    copy.splice(index, 1);
    setSelectedFiles(copy);
  };

  return (
    <div className={classes.uploadBlockWrapper}>
      {selectedFiles.length === 0 ? (
        <div {...getRootProps({ className: classes.uploadBlock })}>
          <input {...getInputProps()} />
          <UploadIcon />
          <p className={classes.uploadText}>Click or drag here to upload</p>
        </div>
      ) : (
        <ul className={classes.draggedFilesList}>
          {selectedFiles.map((file, index) => (
            <li className={classes.draggedFilesItem} key={index}>
              <div className={classes.draggedFilesContent}>
                <img
                  src={URL.createObjectURL(file)}
                  className={classes.draggedFilesImage}
                />
                <p className={classes.draggedFilesCaption}>{file.name}</p>
              </div>

              <Close
                className={classes.draggedFilesRemove}
                onClick={() => removeFile(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(UploadDropzone);
