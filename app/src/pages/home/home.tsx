import React, { useContext, useState, useEffect } from 'react';

// Hooks
import useStyles from './homeStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { usePodStateMachine } from 'src/contexts/podStateMachine';
import {
  STATES_NAMES,
  POD_STATUS,
  DIRECTORY_STATUS,
  DIRECTORY_CONTEXTS,
} from 'src/types/pod-state';

// Components
import MenuRibbon from './partials/menuRibbon/menuRibbon';
import Drive from 'src/pages/home/content/drive/drive';
import PodSidebar from './partials/podSidebar/podSidebar';
import RightSidebar, {
  RIGHT_SIDEBAR_VARIANTS,
} from './partials/rightSidebar/rightSidebar';
// import Overview from 'layout/components/overview/overview';

// Icons
import { TailSpinner } from 'src/components/icons/icons';

// Types
import { IFile } from 'src/types/models/File';
import { AVAILABLE_PAGES } from 'src/types/pages';
export interface OpenRightSidebar {
  payload?: IFile;
  variant: RIGHT_SIDEBAR_VARIANTS;
}
export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const { podStateMachine } = usePodStateMachine();
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const loadingPodOrDirectoryName = () => {
    if (
      podStateMachine.tag === STATES_NAMES.POD_STATE &&
      podStateMachine.status === POD_STATUS.LOADING
    ) {
      return {
        type: 'Pod',
        content: podStateMachine.podName,
      };
    } else if (
      podStateMachine.tag === STATES_NAMES.DIRECTORY_STATE &&
      podStateMachine.status === DIRECTORY_STATUS.LOADING
    ) {
      return {
        type: 'Directory',
        content: podStateMachine.directoryName,
      };
    } else {
      return {
        type: '',
        content: 'Location is being reloaded',
      };
    }
  };

  const isPodStateOtherThanInitialAndUserLogged = () =>
    podStateMachine.tag !== STATES_NAMES.INITIAL &&
    podStateMachine.tag !== STATES_NAMES.USER_LOGGED;

  const isPodOrRootDirectoryLoading = () =>
    (podStateMachine.tag === STATES_NAMES.POD_STATE &&
      podStateMachine.status === POD_STATUS.LOADING) ||
    (podStateMachine.tag === STATES_NAMES.DIRECTORY_STATE &&
      podStateMachine.directoryName === 'root' &&
      podStateMachine.status === DIRECTORY_STATUS.LOADING);

  const isRootDirectoryLoadedSuccessfuly = () =>
    (podStateMachine.tag === STATES_NAMES.DIRECTORY_STATE &&
      podStateMachine.status === DIRECTORY_STATUS.SUCCESS) ||
    (podStateMachine.tag === STATES_NAMES.DIRECTORY_STATE &&
      podStateMachine.context === DIRECTORY_CONTEXTS.FILE_ACTION);

  // Manage sidebar
  const [sidebarItem, setSidebarItem] = useState<AVAILABLE_PAGES>(
    AVAILABLE_PAGES.DRIVE
  );

  const [showPodSidebar, setShowPodSidebar] = useState(false);

  // Right Sidebar managment
  const [rightSidebarData, setRightSidebarData] =
    useState<OpenRightSidebar | null>(null);

  const openRightSidebar = (data: OpenRightSidebar): void => {
    setRightSidebarData({
      payload: data.payload,
      variant: data.variant,
    });
  };

  const closeRightSidebar = (): void => {
    setRightSidebarData(null);
  };

  // If we change pod or directory let's hide right sidebar
  useEffect(() => {
    if (
      (podStateMachine.tag === STATES_NAMES.DIRECTORY_STATE &&
        podStateMachine.context === DIRECTORY_CONTEXTS.DIRECTORY_ACTION) ||
      podStateMachine.tag === STATES_NAMES.POD_STATE
    ) {
      closeRightSidebar();
    }
  }, [podStateMachine]);

  return (
    <div className={classes.Home}>
      <MenuRibbon
        showPodSidebar={showPodSidebar}
        setShowPodSidebar={setShowPodSidebar}
        sidebarItem={sidebarItem}
        setSidebarItem={(pageName) => setSidebarItem(pageName)}
      />
      <PodSidebar
        setShowPodSidebar={setShowPodSidebar}
        isOpen={sidebarItem !== AVAILABLE_PAGES.EXPLORE && showPodSidebar}
        route={sidebarItem}
      />

      {sidebarItem === AVAILABLE_PAGES.DRIVE &&
        isPodStateOtherThanInitialAndUserLogged() && (
          <>
            {isPodOrRootDirectoryLoading() && (
              <div
                className={`${classes.loadingDriveWrapper} ${
                  showPodSidebar ? classes.loadingDrivePodBarOpen : ''
                }`}
              >
                <div className={classes.loadingDrive}>
                  <TailSpinner className={classes.loadingDriveIcon} />
                  <p className={classes.loadingDriveTitle}>
                    Loading {loadingPodOrDirectoryName().type} ...
                  </p>
                  <p className={classes.loadingDriveCaption}>
                    {loadingPodOrDirectoryName().content}
                  </p>
                </div>
              </div>
            )}
            {isRootDirectoryLoadedSuccessfuly() && (
              <Drive
                isPodBarOpen={showPodSidebar}
                setRightSidebarContent={(data) => openRightSidebar(data)}
              />
            )}
          </>
        )}
      {rightSidebarData && (
        <RightSidebar
          onClose={() => closeRightSidebar()}
          file={rightSidebarData.payload}
          variant={rightSidebarData.variant}
        />
      )}
    </div>
  );
}

export default React.memo(Home);
