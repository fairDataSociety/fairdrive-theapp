import React, { useContext, useEffect, useState } from 'react';

// Hooks
import useStyles from './podSidebarStyles';
import {
  usePodContextActions,
  AllowedPodActions,
} from 'src/hooks/usePodContextActions';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from '../../store/store';

// Components
import { PodChevron, PodInfo } from '../icons/icons';
import { Modal } from '@material-ui/core';
import Toggle from '../toggle/toggle';
import CreateNew from '../modals/createNew/createNew';

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
  // General
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const pods = ['Private Pod', 'Shared Pod', 'My Photos'];

  // State
  const [open, setOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);

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

  const handleOpen = () => {
    setOpen(true);
  };

  // Pod Context Actions
  const { handleOpenPod, handleCreatePod, handleImportPod, handleOverview } =
    usePodContextActions();

  // Proxy pod context actions calls
  const proxyPodContextActions = async (
    type: AllowedPodActions,
    podName?: string
  ) => {
    switch (type) {
      case 'open':
        await handleOpenPod(podName);
        break;
      case 'create':
        await handleCreatePod(podName).then(() => {
          handleClose();
          setPodState({
            ...podState,
            isCreated: true,
          });
        });
        break;
      case 'import':
        await handleImportPod(podState.reference, 'importedpod');
        break;
      case 'overview':
        await handleOverview(podName);
        break;
      default:
        console.warn(`proxyPodContextActions: Unknown action type of ${type}`);
        break;
    }
  };

  useEffect(() => {
    if (state.podsOpened.includes(state.podName)) {
      actions.getDirectory({
        directory: state.directory,
        podName: state.podName,
      });
    }
  }, [state.podName, state.podsOpened]);

  useEffect(() => {
    const areAnyDirectoryOrFileExists = () =>
      (state.entries && state.entries.length) ||
      (state.dirs && state.dirs.length);

    if (areAnyDirectoryOrFileExists()) {
      props.setShowPodSidebar(false);
    }
  }, [state.entries, state.dirs]);

  useEffect(() => {
    actions.getPods();
    setPodState({
      ...podState,
      isCreated: false,
    });
  }, [podState.isCreated]);

  useEffect(() => {
    actions.setPrivatePod(isPrivate);
  }, [isPrivate]);

  return (
    <div className={classes.podDrawer}>
      <Toggle
        show={props.route !== 'Overview' && props.route !== 'Explore'}
        isLeft={isPrivate}
        setLeft={setIsPrivate}
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
      <button className={classes.podButton} onClick={handleOpen}>
        {isPrivate ? 'Create Pod' : 'Import Pod'}
      </button>
      {props.route === 'Overview' ? (
        <div className={classes.pods}>
          {pods.map((pod, index) => {
            return (
              <div
                key={index}
                className={classes.podRow}
                // onClick={() => proxyPodContextActions('overview', pod)}
              >
                <label>{pod}</label>
                <PodChevron className={classes.podChevron} />
              </div>
            );
          })}
        </div>
      ) : props.route !== 'Explore' ? (
        <div className={classes.pods}>
          {state.pods.map((pod, index) => {
            return (
              <div
                key={index}
                className={classes.podRow}
                onClick={() => proxyPodContextActions('open', pod)}
              >
                <label>{pod}</label>
                <PodChevron className={classes.podChevron} />
              </div>
            );
          })}
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
        {isPrivate ? (
          <CreateNew
            handleClick={() => proxyPodContextActions('create', podState.name)}
            handleClose={handleClose}
            isRefLink={!isPrivate}
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
            handleClick={() => proxyPodContextActions('import')}
            handleClose={handleClose}
            isRefLink={!isPrivate}
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
