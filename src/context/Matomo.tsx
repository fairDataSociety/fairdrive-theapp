/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useState } from 'react';
import {
  MatomoProvider as OriginalMatomoProvider,
  createInstance,
} from '@datapunt/matomo-tracker-react';

type MatomoTracker = ReturnType<typeof createInstance>;
export interface MatomoProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface IMatomoContext {
  instance: MatomoTracker;
  setEnabled: (enable: boolean) => void;
}

const MatomoContext = createContext<IMatomoContext>({
  instance: null,
  setEnabled: () => {},
});

function createMatomoTracker() {
  return createInstance({
    urlBase: 'https://mtm.swarm.foundation/',
    siteId: 7,
    heartBeat: {
      active: true,
      seconds: 10,
    },
    linkTracking: true,
    configurations: {
      disableCookies: true,
      setSecureCookie: false,
      setRequestMethod: 'POST',
    },
  });
}

function createMatomoTrackerMock() {
  return {
    enableHeartBeatTimer: () => {},
    enableLinkTracking: () => {},
    trackEvents: () => {},
    stopObserving: () => {},
    trackEvent: () => {},
    trackSiteSearch: () => {},
    trackLink: () => {},
    trackPageView: () => {},
    addEcommerceItem: () => {},
    removeEcommerceItem: () => {},
    clearEcommerceCart: () => {},
    trackEcommerceOrder: () => {},
    trackEcommerceCartUpdate: () => {},
    setEcommerceView: () => {},
    setEcommerceCategoryView: () => {},
    track: () => {},
    pushInstruction: () => {},
  } as unknown as MatomoTracker;
}

export const useMatomoContext = () => useContext(MatomoContext);

export const MatomoProvider = ({ children }: MatomoProps) => {
  const [instance, setInstance] = useState<MatomoTracker>(
    createMatomoTrackerMock()
  );

  const setEnabled = (enabled: boolean) => {
    setInstance(enabled ? createMatomoTracker() : createMatomoTrackerMock());
  };

  return (
    <MatomoContext.Provider
      value={{
        instance,
        setEnabled,
      }}
    >
      <OriginalMatomoProvider value={instance}>
        {children}
      </OriginalMatomoProvider>
    </MatomoContext.Provider>
  );
};
