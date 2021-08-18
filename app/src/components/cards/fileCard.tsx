import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import prettyBytes from 'pretty-bytes';
import moment from 'moment';

// Context
import { StoreContext } from 'src/store/store';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import CardWrapper from './cardWrapper/cardWrapper';
import CardHeader from './cardHeader/cardHeader';
import CardBody from './cardBody/cardBody';
import { InfoIcon, Folder, Kebab } from '../icons/icons';
import DropDown from '../dropDown/dropDown';

// Types
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';
import useStyles from './fileCardStyles';
import writePath from 'src/helpers/writePath';
import { shortenTitle } from 'src/helpers/utils';
import ClickAwayListener from 'react-click-away-listener';
type Sizes = 'small' | 'regular' | 'big';
export interface Props {
  size?: Sizes;
  file: IDirectory | IFile;
  isDirectory: boolean;
  onFileClick?: () => void;
}

function FileCard(props: Props) {
  const { file } = props;
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  // eslint-disable-next-line
  const history = useHistory();

  const [fileSize, setFileSize] = useState('');
  const [fileCreateDate, setFileCreateDate] = useState('');
  // eslint-disable-next-line
  const [fileModDate, setFileModDate] = useState('');
  const [Icon, setIcon] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    file.content_type === 'inode/directory'
      ? setIcon(Folder)
      : setIcon(InfoIcon);
    if ((file as IFile).size !== undefined) {
      setFileSize(prettyBytes(parseInt((file as IFile).size)));
      setFileCreateDate(
        moment.unix(parseInt(file.creation_time)).format('DD/MM/YYYY HH:mm:ss')
      );
      setFileModDate(
        moment
          .unix(parseInt(file.modification_time))
          .format('DD/MM/YYYY HH:mm:ss')
      );
    }
  }, [file]);

  const handleDelete = async () => {
    actions.deleteFile({
      file_name: props.file.name,
      path: writePath(state.directory),
      podName: state.podName,
    });
  };

  async function onFileClick() {
    if (file.content_type === 'inode/directory') {
      const newDirectory =
        state.directory !== 'root'
          ? state.directory + '/' + file.name
          : file.name;
      actions.setDirectory(newDirectory);
    }
  }

  const displayFileName =
    file.name.length > 22 ? shortenTitle(file.name) : file.name;

  return (
    <div className={classes.wrapper}>
      <Kebab
        className={classes.kebabIcon}
        onClick={() => setDropdown(!dropdown)}
      />
      <CardWrapper
        onFileClick={props.onFileClick ? props.onFileClick : onFileClick}
        size={props.size}
      >
        <div>
          <CardHeader
            file={file}
            isDirectory={props.isDirectory}
            Icon={Icon}
            heading={displayFileName}
          />
        </div>
        <CardBody
          fileSize={fileSize}
          dateCreated={fileCreateDate}
          isDirectory={props.isDirectory}
        />
      </CardWrapper>
      {dropdown && (
        <ClickAwayListener onClickAway={() => setDropdown(!dropdown)}>
          <div className={classes.dropdown}>
            <DropDown variant="primary" heading="Preview">
              <ul>
                <li className={classes.listItem}>
                  <button onClick={handleDelete}>Hide</button>
                </li>
                <li className={classes.listItem}>
                  <button>View Hidden Files</button>
                </li>
                <li className={classes.listItem}>
                  <button>Download</button>
                </li>
                <li className={classes.listItem}>
                  <button>Accept and Open</button>
                </li>
              </ul>
            </DropDown>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default React.memo(FileCard);
