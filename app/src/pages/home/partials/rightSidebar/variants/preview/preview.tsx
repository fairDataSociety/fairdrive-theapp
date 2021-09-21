import React, { useContext } from 'react';
import prettyBytes from 'pretty-bytes';

// Hooks
import useStyles from '../../rightSidebarStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Components
import FilePreview from 'src/components/filePreview/filePreview';

// Helpers
import { urlPath, formatDate } from 'src/helpers';
import { shortenTitle } from 'src/helpers/utils';

// Types
import { IFile } from 'src/types/models/File';

// Icons
import { Download, Globe, Hide, Share } from 'src/components/icons/icons';

export interface Props {
  content: IFile;
  callAction: (type: 'delete' | 'download' | 'share' | 'open') => Promise<void>;
}

const PreviewVariant = (props: Props): JSX.Element => {
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const metadata = [
    { label: 'File size', value: prettyBytes(parseInt(props.content.size)) },
    { label: 'File type', value: props.content.content_type },
    { label: 'Created', value: formatDate(props.content.creation_time) },
    { label: 'Modified', value: formatDate(props.content.modification_time) },
  ];

  const availableActions = [
    { label: 'Delete', action: () => props.callAction('delete'), icon: Hide },
    {
      label: 'Download',
      action: () => props.callAction('download'),
      icon: Download,
    },
    {
      label: 'Share',
      action: () => props.callAction('share'),
      icon: Share,
    },
    // {
    //   label: 'Open',
    //   action: () => props.callAction('open'),
    //   icon: Globe,
    // },
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

      <div className={classes.actionsIconsWrapper}>
        {availableActions.map((action, index) => (
          <div
            key={index}
            className={classes.actionIcon}
            onClick={() => action.action()}
          >
            <action.icon></action.icon>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(PreviewVariant);
