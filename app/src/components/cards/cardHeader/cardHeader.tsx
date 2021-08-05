import React, { useContext } from 'react';
import { Kebab } from 'src/components/icons/icons';
import { ThemeContext } from '../../../store/themeContext/themeContext';
import useStyles from './cardHeaderStyles';

export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  heading: string;
  isDirectory?: boolean;
  handleClick: () => void;
}

function CardHeader(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { Icon, heading } = props;
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.CardHeader}>
      <Kebab className={classes.kebabIcon} onClick={props.handleClick} />
      {props.Icon && (
        <div className={classes.iconContainer}>
          <Icon className={classes.Icon} />
        </div>
      )}
      <h2 className={classes.Title}>{heading}</h2>
    </div>
  );
}

export default React.memo(CardHeader);
