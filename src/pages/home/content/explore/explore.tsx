import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './exploreStyles';

import dapps from 'src/helpers/appDiscovery.json';

import { Search as SearchIcon } from 'src/components/icons/icons';

export interface Props {
  appSearch: string;
}

function Overview(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const themeExtension = theme.name === 'light' ? 'Light' : '';

  const defaultIcon = (e) => {
    e.target.src = '/media/dapps/Default.svg';
  };

  const filterDapps = (dapp) => {
    for (let i = 0; i < dapp.tags.length; i++) {
      if (dapp.tags[i].includes(props.appSearch)) return true;
    }

    return dapp.name
      .toLowerCase()
      .includes(props.appSearch.toLocaleLowerCase());
  };

  return (
    <div className={classes.explore_container}>
      <h1 className={classes.explore_title}>Explore</h1>

      {props.appSearch.length > 0 && (
        <div className={classes.searchDivider}>
          <SearchIcon className={classes.searchIcon} />
          <span>{props.appSearch}</span>
        </div>
      )}

      <div className={classes.explore_card_container}>
        {dapps?.filter(filterDapps).map((dapp) => {
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
