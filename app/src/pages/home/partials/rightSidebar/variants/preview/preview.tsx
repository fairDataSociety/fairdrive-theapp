import React, { useContext } from 'react';
import prettyBytes from 'pretty-bytes';

// Hooks
import useStyles from './previewStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Components
import FilePreview from 'src/components/filePreview/filePreview';

// Icons
import { Download, Hide } from 'src/components/icons/icons';

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
  // General
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  // Methods
  const displayFileName =
    props.content.name.length > 22
      ? shortenTitle(props.content.name)
      : props.content.name;

  return (
    <>
      <div className={classes.divider}></div>

      <div className={classes.iconContainer}>
        <FilePreview
          file={props.content}
          contentType={props.content.content_type}
          filename={props.content.name}
          directory={urlPath(state.directory)}
          podName={state.podName}
        />
      </div>
      <div className={classes.divider}></div>
      <div className={classes.titleWrapper}>
        <p className={classes.title}>{displayFileName}</p>
        <p className={classes.fileLocation}>{'/' + urlPath(state.directory)}</p>
      </div>
      <div className={classes.fileInfoContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.pair}>
            <p className={classes.label}>File size</p>
            <p className={classes.value}>
              {prettyBytes(parseInt(props.content.size))}
            </p>
          </div>
          <div>
            <p className={classes.label}>Created</p>
            <p className={classes.value}>
              {formatDate(props.content.creation_time)}
            </p>
          </div>
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.pair}>
            <p className={classes.label}>Modified</p>
            <p className={classes.value}>
              {formatDate(props.content.modification_time)}
            </p>
          </div>
          <div>
            <p className={classes.label}>File type</p>
            <p className={classes.value}>{props.content.content_type}</p>
          </div>
        </div>
      </div>
      <div className={classes.actionBar}>
        <Hide
          className={classes.icon}
          onClick={() => props.callAction('delete')}
        />
        <Download
          className={classes.icon}
          onClick={() => props.callAction('download')}
        />
      </div>
    </>
  );
};

export default React.memo(PreviewVariant);
