import React, { useContext } from 'react';
import ClickAwayListener from 'react-click-away-listener';

// Hooks
import { useFileContextActions } from 'src/hooks/useFileContextActions';
import useStyles from './cardDropdownStyles';

// Context
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import DropDown from 'src/components/dropDown/dropDown';

// Types
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';

interface Option {
  name: string;
  action: (filename: string) => Promise<void>;
}

export interface Props {
  file: IDirectory | IFile;
  onHideDropdown: () => void;
}

function CardDropdown(props: Props): JSX.Element {
  // General
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  // File Context Actions
  const { handleDelete, handleDownload } = useFileContextActions();

  // Options
  const options: Option[] = [
    {
      name: 'Hide',
      action: handleDelete,
    },
    {
      name: 'Download',
      action: handleDownload,
    },
  ];

  return (
    <ClickAwayListener onClickAway={() => props.onHideDropdown()}>
      <div className={classes.dropdown}>
        <DropDown variant="primary" heading="Preview">
          <ul>
            {options.map((option, index) => (
              <li key={index} className={classes.listItem}>
                <button onClick={() => option.action(props.file.name)}>
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </DropDown>
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(CardDropdown);
