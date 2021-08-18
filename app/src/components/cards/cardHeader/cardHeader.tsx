import React, { useContext, useEffect } from 'react';
import FilePreviewFallback from 'src/components/filePreview/filePreviewFallback';

// Hooks
import useStyles from './cardHeaderStyles';
import { useHighlightingOfMatchingPhrase } from 'src/hooks/useHighlightingOfMatchingPhrase';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Store
import { StoreContext } from 'src/store/store';
export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  heading: string;
  isDirectory?: boolean;
  file: any;
}

function CardHeader(props: Props) {
  const { state } = useContext(StoreContext);

  const { theme } = useContext(ThemeContext);
  const { heading } = props;
  const classes = useStyles({ ...props, ...theme });

  const { highlightedMatchedPhrase, doHighlightMatchedPhrase } =
    useHighlightingOfMatchingPhrase(state.searchQuery, heading);

  useEffect(() => {
    doHighlightMatchedPhrase();
  }, [state.searchQuery]);

  return (
    <div className={classes.CardHeader}>
      {props.Icon && (
        <div className={classes.iconContainer}>
          <FilePreviewFallback
            file={props.file}
            isDirectory={props.isDirectory}
          />
        </div>
      )}
      <h2 className={classes.Title}>
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
          heading
        )}
      </h2>
    </div>
  );
}

export default React.memo(CardHeader);
