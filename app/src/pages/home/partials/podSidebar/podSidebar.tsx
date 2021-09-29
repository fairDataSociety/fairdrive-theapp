import React, { useContext, useEffect } from 'react';

// Hooks
import useStyles from './podSidebarStyles';
import { useModal, MODAL_VARIANTS } from 'src/contexts/modalContext';

// Contexts
import { PodProviderContext } from 'src/machines/pod';
import { DRIVE_MODES } from 'src/machines/pod/machine';
import PodStates from 'src/machines/pod/states';

import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import { PodChevron, PodInfo } from 'src/components/icons/icons';
import Toggle from 'src/components/toggle/toggle';

import {
  BaseButton,
  BUTTON_VARIANTS,
  BUTTON_SIZE,
} from 'src/shared/BaseButton/BaseButton';

export interface Props {
  isOpen: boolean;
  route: string;
  setShowPodSidebar: any;
}

function PodSidebar(props: Props) {
  // Contexts
  const { PodMachineStore, PodMachineActions } = useContext(PodProviderContext);
  const { openModal, closeModal } = useModal();

  // General
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  // Handle creating and importing pod

  const handleOpenModal = () => {
    if (isPrivateDriveMode()) {
      openModal({
        type: MODAL_VARIANTS.CREATING,
        data: {
          type: 'Pod',
          onButtonClicked: (data) => PodMachineActions.onCreatePod(data),
        },
      });
    } else {
      openModal({
        type: MODAL_VARIANTS.IMPORTING,
        data: {
          type: 'Pod',
          onButtonClicked: (data) => PodMachineActions.onImportPod(data),
        },
      });
    }
  };

  useEffect(() => {
    // TODO: Extend STATES.CREATE_POD with states for success and error
    // to decrease below conditional
    if (
      (PodMachineStore._event.origin === 'createPodService' &&
        PodMachineStore.matches({
          [PodStates.FETCH_PODS]: PodStates.FETCH_PODS_LOADING,
        })) ||
      (PodMachineStore._event.origin === 'importPodService' &&
        PodMachineStore.matches({
          [PodStates.FETCH_PODS]: PodStates.FETCH_PODS_LOADING,
        }))
    ) {
      // Pod created and we fetch pods so let's close modal
      closeModal();
    }
  }, [PodMachineStore]);

  const isPrivateDriveMode = () =>
    PodMachineStore.context.mode === DRIVE_MODES.PRIVATE;

  const toggleDriveMode = () => PodMachineActions.onToggleDriveMode();

  useEffect(() => {
    const fetchedDirectoryContent = PodMachineStore.context.directoryData;

    const areAnyDirectoryOrFileExists = () =>
      (fetchedDirectoryContent.dirs && fetchedDirectoryContent.dirs.length) ||
      (fetchedDirectoryContent.files && fetchedDirectoryContent.files.length);

    if (
      PodMachineStore.matches(PodStates.DIRECTORY_SUCCESS) &&
      areAnyDirectoryOrFileExists()
    ) {
      props.setShowPodSidebar(false);
    }
  }, [PodMachineStore]);

  return (
    <div className={classes.podDrawer}>
      <Toggle
        show={props.route !== 'Overview' && props.route !== 'Explore'}
        isLeft={isPrivateDriveMode()}
        setLeft={() => toggleDriveMode()}
      />
      <div className={classes.podInfoWrapper}>
        <PodInfo className={classes.podInfo} />
        <div className={classes.information}>
          {props.route === 'Overview'
            ? 'These below pods are automatically generated for your Owned Content (Home pod) and Shared Content (Shared Pod'
            : 'Switch from Shared to Owned to see Home Pod'}
        </div>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.buttonWrapper}>
        <BaseButton
          variant={BUTTON_VARIANTS.PRIMARY_OUTLINED}
          size={BUTTON_SIZE.MEDIUM}
          onClickCallback={() => handleOpenModal()}
          isFluid={true}
        >
          {isPrivateDriveMode() ? 'Create Pod' : 'Import Pod'}
        </BaseButton>
      </div>

      {props.route === 'Overview' ? (
        <div className={classes.pods}>
          {PodMachineStore.context.availablePodsList.pod_name.map(
            (pod, index) => {
              return (
                <div key={index} className={classes.podRow}>
                  <label>{pod}</label>
                  <PodChevron className={classes.podChevron} />
                </div>
              );
            }
          )}
        </div>
      ) : props.route !== 'Explore' ? (
        <div className={classes.pods}>
          {PodMachineStore.context.availablePodsList.pod_name.map(
            (pod, index) => {
              return (
                <div
                  key={index}
                  className={classes.podRow}
                  onClick={() => PodMachineActions.onOpenPod(pod)}
                >
                  <label>{pod}</label>
                  <PodChevron className={classes.podChevron} />
                </div>
              );
            }
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(PodSidebar);
