import React, { useContext, useEffect, useState } from 'react';

// Hooks
import useStyles from './podSidebarStyles';

// Contexts
import { PodProviderContext } from 'src/machines/pod';
import { DRIVE_MODES } from 'src/machines/pod/machine';
import PodStates from 'src/machines/pod/states';

import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import { Modal } from '@material-ui/core';
import { PodChevron, PodInfo } from 'src/components/icons/icons';
import { CreateNew } from 'src/components/modals/createNew/createNew';
import Toggle from 'src/components/toggle/toggle';

import {
  BaseButton,
  BUTTON_VARIANTS,
  BUTTON_SIZE,
} from 'src/shared/BaseButton/BaseButton';
interface PodState {
  name: string;
  reference: string;
  isCreated: boolean;
}
export interface Props {
  isOpen: boolean;
  route: string;
  setShowPodSidebar: any;
}

function PodSidebar(props: Props) {
  const { PodMachineStore, PodMachineActions } = useContext(PodProviderContext);

  const isPrivateDriveMode = () =>
    PodMachineStore.context.mode === DRIVE_MODES.PRIVATE;

  const toggleDriveMode = () => PodMachineActions.onToggleDriveMode();

  // General
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  // State
  const [open, setOpen] = useState(false);

  const [podState, setPodState] = useState<PodState>({
    name: '',
    reference: '',
    isCreated: false,
  });

  // Manage opening/closing
  const handleClose = () => {
    setOpen(false);
    setPodState({
      ...podState,
      name: '',
      reference: '',
    });
  };

  const handleOpen = () => setOpen(true);

  // Proxy pod context actions calls
  const proxyActions = async (
    type: 'open' | 'create' | 'import',
    podName?: string
  ) => {
    switch (type) {
      case 'open':
        PodMachineActions.onOpenPod(podName);
        break;
      case 'create':
        PodMachineActions.onCreatePod(podName);
        break;
      case 'import':
        PodMachineActions.onImportPod(podState.reference);
        break;
      default:
        console.warn(`proxyActions: Unknown action type of ${type}`);
        break;
    }
  };

  // TODO: When STATES.CREATING_POD_SUCCESS
  // handleClose();
  // setPodState({
  //   ...podState,
  //   isCreated: true,
  // });

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
          onClickCallback={() => handleOpen()}
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
                <div
                  key={index}
                  className={classes.podRow}
                  // onClick={() => proxyActions('overview', pod)}
                >
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
      {/* <div className={classes.podInfoWrapper}>
        <PodInfo className={classes.podInfo} />
        <div className={classes.information}>
          Photos pod is an auto generated Pod that can be used with Fairphoto.
        </div>
      </div> */}
      {/* <Plus onClick={handleOpen} className={classes.Icon}></Plus> */}

      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {isPrivateDriveMode() ? (
          <CreateNew
            handleClick={() => proxyActions('create', podState.name)}
            handleClose={handleClose}
            isRefLink={!isPrivateDriveMode()}
            setProp={(data) =>
              setPodState({
                ...podState,
                name: data,
              })
            }
            propValue={podState.name}
            type="Pod"
          />
        ) : (
          <CreateNew
            handleClick={() => proxyActions('import')}
            handleClose={handleClose}
            isRefLink={!isPrivateDriveMode()}
            setProp={(data) =>
              setPodState({
                ...podState,
                reference: data,
              })
            }
            propValue={podState.reference}
            type="Pod"
          />
        )}
      </Modal>
    </div>
  );
}

export default React.memo(PodSidebar);
