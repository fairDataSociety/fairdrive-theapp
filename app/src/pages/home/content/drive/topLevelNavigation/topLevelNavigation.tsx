import React, { useContext, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Hooks
import useStyles from './topLevelNavigationStyles';

// Components
import BaseActionButton, {
  ACTION_BUTTON_VARIANTS,
  ACTION_BUTTON_ICONS,
} from 'src/shared/BaseActionButton/BaseActionButton';
import BaseDropdown from 'src/shared/BaseDropdown/BaseDropdown';
import { TCurrentFilter } from '../drive';

export interface Props {
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  showGrid: boolean;
  handleShare: () => Promise<void>;
  currentFilter: TCurrentFilter;
  setCurrentFilter: (selectedFilter: TCurrentFilter) => void;
}

function TopLevelNavigation(props: Props) {
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const { showGrid, setShowGrid } = props;

  const [isSortingDropdownVisible, setIsSortingDropdownVisible] =
    useState(false);

  const splitAndUppercaseCurrentFilterName = (
    currentFilter: string
  ): string => {
    const arr = currentFilter.split('-');
    arr.forEach((word, index) => {
      arr[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return arr.join(' ');
  };

  return (
    <div className={classes.topLevelNavigation}>
      <div className={classes.left}>
        <BaseDropdown
          moveToRight={true}
          optionsList={[
            {
              label: 'Drive',
            },
            {
              label: 'FairOs',
            },
          ]}
        >
          {(openDropdown, isDisabled, isDropdownOpen) => (
            <BaseActionButton
              icon={ACTION_BUTTON_ICONS.FOLDER}
              variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
              hasDropdownInitiator={true}
              isDropdownOpen={isDropdownOpen}
              isDisabled={isDisabled}
              onClickCallback={() => openDropdown()}
            />
          )}
        </BaseDropdown>

        <p className={classes.name}>{state.podName}</p>
      </div>
      <div className={classes.right}>
        {state.podName && (
          <BaseActionButton
            icon={ACTION_BUTTON_ICONS.SHARE}
            variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
            onClickCallback={() => props.handleShare()}
          />
        )}

        <BaseActionButton
          icon={
            !showGrid
              ? ACTION_BUTTON_ICONS.GRID_ICON
              : ACTION_BUTTON_ICONS.LIST_ICON
          }
          variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
          onClickCallback={() => setShowGrid(!showGrid)}
        />

        <BaseDropdown
          optionsList={[
            {
              label: 'Least recent',
              onOptionClicked: () => props.setCurrentFilter('least-recent'),
            },
            {
              label: 'File Type',
              onOptionClicked: () => props.setCurrentFilter('file-type'),
            },
            {
              label: 'Decreasing Size',
              onOptionClicked: () => props.setCurrentFilter('increasing-size'),
            },
            {
              label: 'Ascending ABC',
              onOptionClicked: () => props.setCurrentFilter('ascending-abc'),
            },
            {
              label: 'Descending ABC',
              onOptionClicked: () => props.setCurrentFilter('descending-abc'),
            },
          ]}
        >
          {(openDropdown, isDisabled) => (
            <BaseActionButton
              icon={ACTION_BUTTON_ICONS.SORTING_ICON}
              variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
              onClickCallback={() => openDropdown()}
              isDisabled={isDisabled}
            />
          )}
        </BaseDropdown>
      </div>
    </div>
  );
}

export default React.memo(TopLevelNavigation);
