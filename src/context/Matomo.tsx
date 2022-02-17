import { FC } from 'react';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

export interface MatomoProps {
  children: React.ReactNode | React.ReactNode[];
}

const Matomo: FC<MatomoProps> = ({ children }) => {
  const instance = createInstance({
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

  return <MatomoProvider value={instance}>{children}</MatomoProvider>;
};

export default Matomo;
