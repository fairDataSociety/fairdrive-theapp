import React, { useContext } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from '../../../../rightSidebarStyles';

// Components
import { Close } from 'src/components/icons/icons';
import FilePreview from 'src/components/filePreview/filePreview';

// Helpers
import { urlPath } from 'src/helpers';
export interface Props {
  selectedFiles: File[];
  directory: string;
  podName: string;
  removeFile: (index: number) => void;
}

function UploadQueue(props: Props): JSX.Element {
  // Global
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <>
      {props.selectedFiles.length > 0 ? (
        <ul className={classes.draggedFilesList}>
          {props.selectedFiles.map((file, index) => (
            <li className={classes.draggedFilesItem} key={index}>
              <div className={classes.draggedFilesContent}>
                {file.type.includes('image') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    className={classes.draggedFilesImage}
                  />
                ) : (
                  <FilePreview
                    isQueueItem={true}
                    file={file}
                    contentType={file.type}
                    filename={file.name}
                    directory={urlPath(props.directory)}
                    podName={props.podName}
                  />
                )}

                <p className={classes.draggedFilesCaption}>{file.name}</p>
              </div>

              <Close
                className={classes.draggedFilesRemove}
                onClick={() => props.removeFile(index)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={classes.draggedFilesNoFilesChoosen}>No files choosen</p>
      )}
    </>
  );
}
export default React.memo(UploadQueue);
