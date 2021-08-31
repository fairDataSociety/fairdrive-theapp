import React, { useContext, useState, useEffect } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Hooks
import useStyles from '../../rightSidebarStyles';

// Components
import UploadDropzone from './partials/uploadIndicatorBlock/uploadIndicatorBlock';
import UploadQueryWithProgress from './partials/uploadProgress/uploadProgress';
import UploadQueue from './partials/uploadQueue/uploadQueue';
import {
  BaseButton,
  BUTTON_VARIANTS,
  BUTTON_SIZE,
} from 'src/shared/BaseButton/BaseButton';

export interface Props {
  callAction: (type: 'upload', payload: File[]) => Promise<void>;
}

function UploadVariant(props: Props) {
  // Global
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  // Store selected files
  const [uploadPayload, setUploadPayload] = useState<File[]>([]);

  const availableActions = [
    {
      label: 'Upload Content',
      action: () => props.callAction('upload', uploadPayload),
      isDisabled: () => isUploadPayloadEmpty() || areAnyUploadsInProgress(),
    },
  ];

  const areAnyUploadsInProgress = (): boolean =>
    state.fileUploadProgress.length > 0;

  const isUploadPayloadEmpty = (): boolean => uploadPayload.length === 0;

  // When upload begin, clean selected files
  useEffect(() => {
    if (areAnyUploadsInProgress()) {
      setUploadPayload([]);
    }
  }, [state.fileUploadProgress]);

  // Manage selected files
  const removeFile = (index: number): void => {
    const copy = [...uploadPayload];
    copy.splice(index, 1);
    setUploadPayload(copy);
  };

  const addFiles = (files: File[]): void => {
    const copy = [...uploadPayload];
    copy.push(...files);
    setUploadPayload(copy);
  };

  return (
    <>
      <div className={classes.imageContainer}>
        <UploadDropzone setFilesToUpload={(files) => addFiles(files)} />
      </div>

      <div className={classes.uploadEntriesWrapper}>
        {areAnyUploadsInProgress() ? (
          <UploadQueryWithProgress />
        ) : (
          <UploadQueue
            selectedFiles={uploadPayload}
            removeFile={(fileIndex) => removeFile(fileIndex)}
          />
        )}
      </div>

      <div className={classes.actionsWrapper}>
        {availableActions.map((action, index) => (
          <div key={index} className={classes.action}>
            <BaseButton
              variant={BUTTON_VARIANTS.PRIMARY_OUTLINED}
              size={BUTTON_SIZE.MEDIUM}
              isFluid={true}
              isDisabled={action.isDisabled()}
              onClickCallback={() => action.action()}
            >
              {action.label}
            </BaseButton>
          </div>
        ))}
      </div>
    </>
  );
}

export default React.memo(UploadVariant);
