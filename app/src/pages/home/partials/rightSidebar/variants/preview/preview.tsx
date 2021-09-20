import React, { useContext } from 'react';
import prettyBytes from 'pretty-bytes';

// Hooks
import useStyles from '../../rightSidebarStyles';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Components
import FilePreview from 'src/components/filePreview/filePreview';
import {
  BaseButton,
  BUTTON_VARIANTS,
  BUTTON_SIZE,
} from 'src/shared/BaseButton/BaseButton';

// Helpers
import { urlPath, formatDate } from 'src/helpers';
import { shortenTitle } from 'src/helpers/utils';

// Types
import { IFile } from 'src/types/models/File';

export interface Props {
  content: IFile;
  callAction: (type: 'delete' | 'download') => Promise<void>;
}

const PreviewVariant = (props: Props): JSX.Element => {
  const { state } = useContext(StoreContext);
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  const metadata = [
    { label: 'File size', value: prettyBytes(parseInt(props.content.size)) },
    { label: 'File type', value: props.content.content_type },
    { label: 'Created', value: formatDate(props.content.creation_time) },
    { label: 'Modified', value: formatDate(props.content.modification_time) },
  ];

  const availableActions = [
    { label: 'Delete', action: () => props.callAction('delete') },
    { label: 'Download', action: () => props.callAction('download') },
  ];

  return (
    <>
      <div className={classes.imageContainer}>
        <FilePreview
          file={props.content}
          contentType={props.content.content_type}
          filename={props.content.name}
          directory={urlPath(state.directory)}
          podName={state.podName}
          isPreviewSidebar={true}
        />
      </div>

      <div className={classes.titleWrapper}>
        <p className={classes.title}>{shortenTitle(props.content.name, 22)}</p>
        <p className={classes.fileLocation}>{'/' + urlPath(state.directory)}</p>
      </div>

      <div className={classes.detailsWrapper}>
        {metadata.map((field, index) => (
          <div key={index} className={classes.details}>
            <p className={classes.label}>{field.label}</p>
            <p className={classes.value}>{field.value}</p>
          </div>
        ))}
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
};

export default React.memo(PreviewVariant);
