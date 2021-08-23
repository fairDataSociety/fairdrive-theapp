import React, { useContext } from 'react';

// Hooks
import useStyles from './footerStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import {
  LinumLabs,
  FairDataSociety,
  Github,
  Medium,
  Swarm,
  Discord,
} from 'src/components/icons/icons';

export interface Props {
  setShowTerms: (data) => void;
  showTerms: boolean;
}

function Footer(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <footer className={classes.footer}>
      <div className={classes.brands}>
        <a
          rel="noopener noreferrer"
          target="_blank"
          className={classes.brandsItem}
          href="https://linumlabs.com"
        >
          <LinumLabs className={classes.brandLinumLabs} />
        </a>

        <a
          rel="noopener noreferrer"
          target="_blank"
          className={classes.brandsItem}
          href="https://fairdatasociety.org/"
        >
          <FairDataSociety className={classes.brandFairDataSociety} />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.ethswarm.org/"
          className={classes.brandsItem}
        >
          <Swarm className={classes.brandSwarm} />
        </a>
      </div>
      <div className={classes.links}>
        <div className={classes.text}>
          <span className={classes.footerText}>
            © 2021 Fairdrive. All rights reserved
          </span>
          <span className={classes.footerText}>*</span>
          <span
            className={classes.linkItem}
            onClick={() => {
              props.setShowTerms(true);
            }}
          >
            Terms and conditions
          </span>
          <span className={classes.footerText}>*</span>
          <span className={classes.linkItem}>Privacy Policy</span>
          <div className={classes.divider}></div>
          <span className={classes.footerText}>Sand box environment</span>
        </div>
        <div className={classes.socialMediaWrapper}>
          <a
            rel="noopener noreferrer"
            target="_blank"
            className={classes.linkItem}
            href="https://github.com/fairDataSociety/"
          >
            <Github className={classes.linkIcon} />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            className={classes.linkItem}
            href="https://fairdatasociety.org/"
          >
            <Discord className={classes.linkIcon} />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            className={classes.linkItem}
            href="https://medium.com/fair-data-society"
          >
            <Medium className={classes.linkIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
