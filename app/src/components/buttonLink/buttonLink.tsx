import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './buttonLinkStyles';
import { Link } from 'react-router-dom';
export interface Props {
  color: string;
  label: string;
  path: string;
  small?: boolean;
  icon?: React.ReactNode;
  molecule?: string;
}

function ButtonLink(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const { label, path, icon } = props;

  return (
    <Link to={path} className={classes.ButtonLink}>
      {label}
      {icon && icon}
    </Link>
  );
}

export default React.memo(ButtonLink);
