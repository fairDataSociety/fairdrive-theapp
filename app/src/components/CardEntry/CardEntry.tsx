import React, { useContext, useEffect } from 'react';

import prettyBytes from 'pretty-bytes';

// Hooks
import { useHighlightingOfMatchingPhrase } from 'src/hooks/useHighlightingOfMatchingPhrase';
// Helpers
import { formatDate } from 'src/helpers';

// Context
import { StoreContext } from 'src/store/store';

import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import FilePreviewFallback from 'src/components/filePreview/filePreviewFallback';
import { Kebab as KebabIcon } from '../icons/icons';
import BaseDropdown from 'src/shared/BaseDropdown/BaseDropdown';

// Types
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';
import useStyles from './CardEntryStyles';
import { shortenTitle } from 'src/helpers/utils';
type Sizes = 'small' | 'regular' | 'big';
export interface Props {
  size?: Sizes;
  data: IDirectory | IFile;
  isDirectory: boolean;
  onFileClick?: () => void;
  onDirectoryClick?: () => void;
}

function FileCard(props: Props) {
  const { data } = props;
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  // Handle opening directory or file in sidebar
  const handleOnClick = () => {
    console.log('card clicked');
    if (props.isDirectory) {
      props.onDirectoryClick();
    } else {
      props.onFileClick();
    }
  };

  const getShortedTitle = () => shortenTitle(data.name, 22);

  // Higlight matching phrase by searchQuery
  const { highlightedMatchedPhrase, doHighlightMatchedPhrase } =
    useHighlightingOfMatchingPhrase(state.searchQuery, getShortedTitle());

  useEffect(() => {
    doHighlightMatchedPhrase();
  }, [state.searchQuery]);

  const getSize = () => prettyBytes(parseInt((data as IFile).size));

  const getCreationDate = () => formatDate(data.creation_time, true);

  const isContentTypeDirectory = () => data.content_type === 'inode/directory';

  const isSearchQuerySettedAndHighlighted = () =>
    state.searchQuery && state.searchQuery !== '' && highlightedMatchedPhrase;

  const getDropdownOptionByState = () => {
    if (state.isPrivatePod) {
      return [
        {
          label: 'Rename/Edit',
        },
        {
          label: 'Open',
        },
        {
          label: 'Hide',
        },
        {
          label: 'View Hidden Files',
        },
        {
          label: 'Share',
        },
        {
          label: 'Download',
        },
      ];
    } else {
      return [
        {
          label: 'Hide',
        },
        {
          label: 'View Hidden Files',
        },
        {
          label: 'Download',
        },
        {
          label: 'Accept and Open',
        },
      ];
    }
  };

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.dropdownIconWrapper}>
        <BaseDropdown
          title={'Preview'}
          optionsList={getDropdownOptionByState()}
        >
          {(openDropdown) => (
            <button type="button">
              <KebabIcon onClick={() => openDropdown()} />
            </button>
          )}
        </BaseDropdown>
      </div>

      <div className={classes.cardContent} onClick={() => handleOnClick()}>
        <div className={classes.cardHeader}>
          <FilePreviewFallback
            file={data}
            isDirectory={isContentTypeDirectory()}
          />
        </div>
        <div className={classes.cardBody}>
          <h2 className={classes.title}>
            {isSearchQuerySettedAndHighlighted() ? (
              <>
                {highlightedMatchedPhrase.before}
                <span className={classes.titleHighlightMatchingPhrase}>
                  {highlightedMatchedPhrase.matched}
                </span>
                {highlightedMatchedPhrase.after}
              </>
            ) : (
              getShortedTitle()
            )}
          </h2>
        </div>
        <div className={classes.cardFooter}>
          <div>
            {!isContentTypeDirectory() && (
              <>
                <p className={classes.cardFooterEntryTitle}>File Size</p>
                <p className={classes.cardFooterEntryValue}>{getSize()}</p>
              </>
            )}
          </div>
          <div>
            <p className={classes.cardFooterEntryTitle}>Date Added</p>
            <p className={classes.cardFooterEntryValue}>{getCreationDate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FileCard);
