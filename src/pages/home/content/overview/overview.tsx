import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './overviewStyles';
import SetupCards from 'src/components/setUpCards/setUpCards';
import PodsPreview from 'src/components/podsPreview/podsPreview';
import DataUsageIndicator from 'src/components/dataUsageIndicator/dataUsageIndicator';
import dapps from 'src/helpers/appDiscovery.json';
export interface Props {
  isPodBarOpen: boolean;
}

function Overview(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded === false) {
      setLoaded(true);
      console.log(dapps);
    }
  }, []);
  return (
    <div className={classes.Home}>
      <SetupCards></SetupCards>
      <div className={classes.flex}>
        <PodsPreview />
        <DataUsageIndicator />
      </div>
    </div>
  );
}

export default React.memo(Overview);
