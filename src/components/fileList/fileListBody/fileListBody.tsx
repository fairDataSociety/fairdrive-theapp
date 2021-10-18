import React, { useState, useContext, useEffect } from 'react';
import ClickAwayListener from 'react-click-away-listener';

// Contexts
import { PodProviderContext } from 'src/machines/pod';

// Hooks
import useStyles from './fileListBodyStyles';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import { useHighlightingOfMatchingPhrase } from 'src/hooks/useHighlightingOfMatchingPhrase';

// Components
import DropDown from 'src/components/dropDown/dropDown';

// Types
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';

import { Kebab } from 'src/components/icons/icons';
export interface Props {
  file: IFile | IDirectory;
  name: string;
  type: string;
  size: string;
  created: string;
  modified: string;
  isPodBarOpen: boolean;
}
function FileListBody(props: Props) {
  const { PodMachineStore } = useContext(PodProviderContext);

  const getSearchQuery = () => PodMachineStore.context.searchQuery;

  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  const { highlightedMatchedPhrase, doHighlightMatchedPhrase } =
    useHighlightingOfMatchingPhrase(getSearchQuery(), props.name);

  useEffect(() => {
    doHighlightMatchedPhrase();
  }, [getSearchQuery()]);

  const [dropdown, setDropdown] = useState(false);

  return (
    <div className={classes.fileWrapper}>
      <div className={classes.fileName}>
        {getSearchQuery() &&
        getSearchQuery() !== '' &&
        highlightedMatchedPhrase ? (
          <>
            {highlightedMatchedPhrase.before}
            <span className={classes.highlightMatchedPhrase}>
              {highlightedMatchedPhrase.matched}
            </span>
            {highlightedMatchedPhrase.after}
          </>
        ) : (
          props.name
        )}
      </div>
      <div className={classes.fileInfo}>{props.type}</div>
      <div className={classes.fileInfo}>{props.size}</div>
      <div className={classes.fileInfo}>{props.created}</div>
      <div className={classes.fileInfo}>{props.modified}</div>
      <div className={classes.kebab}>
        <Kebab onClick={() => setDropdown(true)} />
        {dropdown && (
          <ClickAwayListener onClickAway={() => setDropdown(!dropdown)}>
            <div className={classes.dropdown}>
              <DropDown variant="primary" heading="Preview">
                <ul>
                  <li className={classes.listItem}>
                    <button>Hide</button>
                  </li>
                  <li className={classes.listItem}>
                    <button>Download</button>
                  </li>
                </ul>
              </DropDown>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
}

export default React.memo(FileListBody);
