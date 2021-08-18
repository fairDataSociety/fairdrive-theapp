import React, { useContext, useEffect } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { useHighlightingOfMatchingPhrase } from 'src/hooks/useHighlightingOfMatchingPhrase';

// Hooks
import useStyles from './fileListBodyStyles';

// Store
import { StoreContext } from 'src/store/store';

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
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  const { highlightedMatchedPhrase, doHighlightMatchedPhrase } =
    useHighlightingOfMatchingPhrase(state.searchQuery, props.name);

  useEffect(() => {
    doHighlightMatchedPhrase();
  }, [state.searchQuery]);

  return (
    <div className={classes.fileWrapper}>
      <div className={classes.fileName}>
        {state.searchQuery &&
        state.searchQuery !== '' &&
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
      <Kebab />
    </div>
  );
}

export default React.memo(FileListBody);
