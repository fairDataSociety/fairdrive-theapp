import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from '../../rightSidebarStyles';

// Components
import { InfoIcon } from 'src/components/icons/icons';
import UploadDropzone from './partials/uploadIndicatorBlock/uploadIndicatorBlock';
import UploadProgress from './partials/uploadProgress/uploadProgress';
import {
  BaseButton,
  BUTTON_VARIANTS,
  BUTTON_SIZE,
} from 'src/shared/BaseButton/BaseButton';

export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadFile?: boolean;
  handleClose?: () => void;
  visible?: boolean;
  filesToUpload?: FileList;
  callAction: (type: 'upload', payload: FileList) => Promise<void>;
}

function UploadVariant(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [file, setFile] = useState(null);
  const [blob, setBlob] = useState(null);

  const [uploadPayload, setUploadPayload] = useState<FileList | null>(null);

  const availableActions = [
    {
      label: 'Upload Content',
      action: () => props.callAction('upload', uploadPayload),
    },
  ];

  useEffect(() => {
    if (props.filesToUpload && props.filesToUpload instanceof FileList) {
      handleFileUpload(props.filesToUpload);
    }
  }, [props.filesToUpload]);

  let blobFile;

  const handleFileUpload = (files: FileList) => {
    setUploadPayload(files);

    Array.from(files).forEach((file) => {
      blobFile = URL.createObjectURL(file);
      setFile(file);
      setBlob(blobFile);
    });
  };

  useEffect(() => {
    () => {
      if (open) {
        URL.revokeObjectURL(blobFile);
        setBlob(null);
        setFile(null);
      }
    };
  }, []);

  return (
    <>
      <div className={classes.imageContainer}>
        {file && !file.type.includes('image') ? (
          <>
            <InfoIcon />
            <img src={blob} alt="img" />
          </>
        ) : (
          <UploadDropzone />
        )}
      </div>

      <div className={classes.uploadEntriesWrapper}>
        <UploadProgress />
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
