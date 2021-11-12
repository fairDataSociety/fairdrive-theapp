import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './overviewStyles';
import SetupCards from 'src/components/setUpCards/setUpCards';
import PodsPreview from 'src/components/podsPreview/podsPreview';
import DataUsageIndicator from 'src/components/dataUsageIndicator/dataUsageIndicator';
export interface Props {}

function Overview(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

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
