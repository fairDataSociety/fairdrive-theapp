import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './cardBodyStyles';

export interface Props {
  fileSize: string;
  dateCreated: string;
  isDirectory: boolean;
}

function CardBody(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.CardBody}>
      {!props.isDirectory && (
        <div className={classes.body}>
          <div className={classes.size}>
            <p className={classes.label}>FILE SIZE</p>
            <p>{props.fileSize}</p>
          </div>
          <div className={classes.dateCreated}>
            <p className={classes.label}>DATE ADDED</p>
            <p>{props.dateCreated}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(CardBody);
