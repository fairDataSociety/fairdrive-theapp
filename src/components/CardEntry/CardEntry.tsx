/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect } from 'react';

import prettyBytes from 'pretty-bytes';

import { DRIVE_MODES } from 'src/machines/pod/machine';
import PodStates from 'src/machines/pod/states';
import { PodProviderContext } from 'src/machines/pod';

// Hooks
import { useHighlightingOfMatchingPhrase } from 'src/hooks/useHighlightingOfMatchingPhrase';
// Helpers
import { formatDate } from 'src/helpers';

// Context
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
  const { PodMachineStore } = useContext(PodProviderContext);

  const isSearchQuerySetted = () =>
    PodMachineStore.matches(
      `${PodStates.FETCH_PODS}.${PodStates.FETCH_PODS_SUCCESS}.${PodStates.OPEN_POD}.${PodStates.OPEN_POD_SUCCESS}.${PodStates.DIRECTORY}.${PodStates.DIRECTORY_SUCCESS}.${PodStates.SEARCH_RESULTS}`
    );

  const getSearchQuery = () => PodMachineStore.context.searchQuery;

  const isPrivateDriveMode = () =>
    PodMachineStore.context.mode === DRIVE_MODES.PRIVATE;

  const { data } = props;
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  // Handle opening directory or file in sidebar
  const handleOnClick = () => {
    if (props.isDirectory) {
      props.onDirectoryClick();
    } else {
      props.onFileClick();
    }
  };

  const getShortedTitle = () => shortenTitle(data.name, 22);

  // Higlight matching phrase by searchQuery
  const { highlightedMatchedPhrase, doHighlightMatchedPhrase } =
    useHighlightingOfMatchingPhrase(getSearchQuery(), getShortedTitle());

  useEffect(() => {
    if (isSearchQuerySetted() && getSearchQuery()) {
      doHighlightMatchedPhrase();
    }
  }, [PodMachineStore]);

  const getSize = () => prettyBytes(parseInt((data as IFile).size));

  const getCreationDate = () => formatDate(data.creation_time, true);

  const isContentTypeDirectory = () => data.content_type === 'inode/directory';

  const isSearchQuerySettedAndHighlighted = () =>
    getSearchQuery() &&
    getSearchQuery() !== '' &&
    highlightedMatchedPhrase !== null;

  const getDropdownOptionByState = () => {
    if (isPrivateDriveMode()) {
      return [
        {
          label: 'Rename/Edit',
          onOptionClicked: () => {},
        },
        {
          label: 'Open',
          onOptionClicked: () => {},
        },
        {
          label: 'Hide',
          onOptionClicked: () => {},
        },
        {
          label: 'View Hidden Files',
          onOptionClicked: () => {},
        },
        {
          label: 'Share',
          onOptionClicked: () => {},
        },
        {
          label: 'Download',
          onOptionClicked: () => {},
        },
      ];
    } else {
      return [
        {
          label: 'Hide',
          onOptionClicked: () => {},
        },
        {
          label: 'View Hidden Files',
          onOptionClicked: () => {},
        },
        {
          label: 'Download',
          onOptionClicked: () => {},
        },
        {
          label: 'Accept and Open',
          onOptionClicked: () => {},
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
