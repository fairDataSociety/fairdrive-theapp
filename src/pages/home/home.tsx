import React, { useContext, useState, useEffect, useCallback } from 'react';

// Hooks
import useStyles from './homeStyles';

// Contexts
// import AuthStates from 'src/machines/auth/states';
// import { AuthProviderContext } from 'src/machines/auth';

import PodStates from 'src/machines/pod/states';
import { PodProviderContext } from 'src/machines/pod';

import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import MenuRibbon from './partials/menuRibbon/menuRibbon';
import Drive from 'src/pages/home/content/drive/drive';
import PodSidebar from './partials/podSidebar/podSidebar';
import RightSidebar, {
  RIGHT_SIDEBAR_VARIANTS,
} from './partials/rightSidebar/rightSidebar';
import Overview from 'src/pages/home/content/overview/overview';
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
  const { PodMachineStore } = useContext(PodProviderContext);

  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  const loadingPodOrDirectoryName = () => {
    if (
      PodMachineStore.matches(
        'fetch_pods.fetch_pods_success.open_pod.open_pod_loading'
      )
    ) {
      return {
        type: 'Pod',
        content: PodMachineStore.context.podNameToOpen,
      };
    } else if (
      PodMachineStore.matches(
        'fetch_pods.fetch_pods_success.open_pod.open_pod_success.directory.directory_loading'
      )
    ) {
      return {
        type: 'Directory',
        content: PodMachineStore.context.directoryNameToOpen,
      };
    } else {
      return {
        type: '',
        content: 'Location is being reloaded',
      };
    }
  };

  const isPodOrRootDirectoryLoading = useCallback(
    () =>
      PodMachineStore.matches(
        'fetch_pods.fetch_pods_success.open_pod.open_pod_loading'
      ) ||
      PodMachineStore.matches(
        'fetch_pods.fetch_pods_success.open_pod.open_pod_success.directory.directory_loading'
      ),
    [PodMachineStore]
  );

  const isRootDirectoryLoadedSuccessfuly = useCallback(
    () =>
      // TODO: Rewrite below to PodState enum
      PodMachineStore.matches(
        'fetch_pods.fetch_pods_success.open_pod.open_pod_success.directory.directory_success'
      ),
    [PodMachineStore]
  );

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
      PodMachineStore.matches(PodStates.OPEN_POD_LOADING) ||
      PodMachineStore.matches(PodStates.DIRECTORY_LOADING)
    ) {
      closeRightSidebar();
    }
  }, [PodMachineStore]);

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
        isOpen={
          sidebarItem !== AVAILABLE_PAGES.OVERVIEW &&
          sidebarItem !== AVAILABLE_PAGES.EXPLORE &&
          showPodSidebar
        }
        route={sidebarItem}
      />
      {sidebarItem === AVAILABLE_PAGES.OVERVIEW && <Overview></Overview>}
      {sidebarItem === AVAILABLE_PAGES.DRIVE && (
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
