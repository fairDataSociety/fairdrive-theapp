import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from '../../rightSidebarStyles';

// Components
import UploadDropzone from './partials/uploadIndicatorBlock/uploadIndicatorBlock';
import UploadQueryWithProgress from './partials/uploadProgress/uploadProgress';
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
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  // Store selected files
  const [uploadPayload, setUploadPayload] = useState<File[]>([]);

  const availableActions = [
    {
      label: 'Upload Content',
      action: () => props.callAction('upload', uploadPayload),
    },
  ];

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
        <UploadQueryWithProgress
          removeFile={(fileIndex) => removeFile(fileIndex)}
        />
      </div>

      <div className={classes.actionsWrapper}>
        {availableActions.map((action, index) => (
          <div key={index} className={classes.action}>
            <BaseButton
              variant={BUTTON_VARIANTS.PRIMARY_OUTLINED}
              size={BUTTON_SIZE.MEDIUM}
              isFluid={true}
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
