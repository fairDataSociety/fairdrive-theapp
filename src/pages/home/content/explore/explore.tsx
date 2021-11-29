import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './exploreStyles';

import dapps from 'src/helpers/appDiscovery.json';

function Overview() {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const themeExtension = theme.name === 'light' ? 'Light' : '';

  const defaultIcon = (e) => {
    e.target.src = '/media/dapps/Default.svg';
  };

  return (
    <div className={classes.explore_container}>
      <h1 className={classes.explore_title}>Explore</h1>

      <div className={classes.explore_card_container}>
        {dapps?.map((dapp) => {
          return (
            <div key={dapp.name} className={classes.explore_card}>
              <img
                src={
                  dapp.icon || `/media/dapps/${dapp.name + themeExtension}.svg`
                }
                alt={`${dapp.name} Icon`}
                onError={defaultIcon}
              />
              <div className={classes.explore_card_content}>
                <h2 className={classes.explore_card_title}>{dapp.name}</h2>
                <p className={classes.explore_card_description}>
                  {dapp.description}
                </p>
                <a
                  href={dapp.link}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.explore_card_button}
                >
                  Open {dapp.name}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Overview);
