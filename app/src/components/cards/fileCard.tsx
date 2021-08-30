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
import CardDropdown from './cardDropdown/cardDropdown';
import { InfoIcon, Folder, Kebab } from '../icons/icons';

// Types
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';
import useStyles from './fileCardStyles';
import { shortenTitle } from 'src/helpers/utils';
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

  async function onFileClick() {
    if (file.content_type === 'inode/directory') {
      const newDirectory =
        state.directory !== 'root'
          ? state.directory + '/' + file.name
          : file.name;
      actions.setDirectory(newDirectory);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Kebab
        className={classes.kebabIcon}
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
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
            heading={shortenTitle(file.name, 22)}
          />
        </div>
        <CardBody
          fileSize={fileSize}
          dateCreated={fileCreateDate}
          isDirectory={props.isDirectory}
        />
      </CardWrapper>
      {isDropdownVisible && (
        <CardDropdown
          file={props.file}
          onHideDropdown={() => setIsDropdownVisible(false)}
        />
      )}
    </div>
  );
}

export default React.memo(FileCard);
