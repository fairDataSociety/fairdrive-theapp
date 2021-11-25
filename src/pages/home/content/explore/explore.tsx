import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './exploreStyles';

import dapps from 'src/helpers/appDiscovery.json';
export interface Props {
  isPodBarOpen: boolean;
}

function Overview(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const [loaded, setLoaded] = useState(false);
  const [apps, setApps] = useState(null);
  useEffect(() => {
    if (loaded === false) {
      setLoaded(true);
      setApps(dapps);
    }
  }, []);
  return (
    <div className={classes.Home}>
      {apps &&
        apps.map((app) => {
          <div>
            {' '}
            <h3>{app.name}</h3>
            <h3>{app.description}</h3>
            <a target="_blank" href={app.link} rel="noreferrer">
              {app.link}
            </a>
          </div>;
        })}
    </div>
  );
}

export default React.memo(Overview);
