/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { DRIVE_MODES } from 'src/machines/pod/machine';
// import PodStates from 'src/machines/pod/states';
import { PodProviderContext } from 'src/machines/pod';

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
  handleShare: () => void;
  setCookieView: () => void;
  currentFilter: TCurrentFilter;
  setCurrentFilter: (selectedFilter: TCurrentFilter) => void;
}

function TopLevelNavigation(props: Props) {
  const { PodMachineStore } = useContext(PodProviderContext);

  const isPrivateDriveMode = () =>
    PodMachineStore.context.mode === DRIVE_MODES.PRIVATE;

  const { showGrid, setShowGrid } = props;
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const splitAndUppercaseCurrentFilterName = (
    currentFilter: string
  ): string => {
    const arr = currentFilter.split('-');
    arr.forEach((word, index) => {
      arr[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return arr.join(' ');
  };

  const getDirectoryPath = () => {
    const stateDirectoryName = PodMachineStore.context.directoryNameToOpen;
    if (stateDirectoryName !== 'root') {
      return `/ root / ${stateDirectoryName}`;
    } else {
      return `/ root`;
    }
  };

  return (
    <div className={classes.topLevelNavigation}>
      <div className={classes.left}>
        <BaseDropdown
          title={isPrivateDriveMode() ? 'Private Pod' : 'Shared Pod'}
          moveToRight={true}
          optionsList={[
            {
              label: 'Drive',
              onOptionClicked: () => {},
            },
            {
              label: 'FairOs',
              onOptionClicked: () => {},
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

        <p className={classes.name}>
          {PodMachineStore.context.currentlyOpenedPodName}
          <span className={classes.directoryPath}>{getDirectoryPath()}</span>
        </p>
      </div>
      <div className={classes.right}>
        {PodMachineStore.context.currentlyOpenedPodName === 'Consents' &&
          PodMachineStore.context.directoryNameToOpen === 'root' && (
            <BaseActionButton
              icon={ACTION_BUTTON_ICONS.INFO_ICON}
              variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
              onClickCallback={props.setCookieView}
            />
          )}

        {PodMachineStore.context.currentlyOpenedPodName && (
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
          title={'Sort By'}
          option={splitAndUppercaseCurrentFilterName(props.currentFilter)}
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
              hasDropdownInitiator={true}
              showDropdownInitiatorOnHover={true}
              isDisabled={isDisabled}
            />
          )}
        </BaseDropdown>
      </div>
    </div>
  );
}

export default React.memo(TopLevelNavigation);
