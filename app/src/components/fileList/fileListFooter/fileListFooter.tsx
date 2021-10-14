import React, { useState } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './fileListFooterStyles';
import { BaseSelect } from 'src/shared/BaseSelect/BaseSelect';
import { ChevronDown } from 'src/components/icons/icons';

export interface Props {}
function FileListHeader(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  const [currentOptionID, setCurrentOptionID] = useState(0);

  const options = [
    {
      id: 0,
      label: '5',
    },
    {
      id: 1,
      label: '10',
    },
    {
      id: 2,
      label: '15',
    },
    {
      id: 3,
      label: '20',
    },
  ];

  return (
    <div className={classes.footerWrapper}>
      <div className={classes.rowPerPage}>
        Rows per page:
        <BaseSelect
          option={currentOptionID}
          changeOption={(data) => setCurrentOptionID(data)}
          options={options}
        />
      </div>
      <div className={classes.pagination}>
        1-12 of 48
        <div className={classes.indicatorGroup}>
          <ChevronDown className={classes.arrowLeft} />
          <ChevronDown className={classes.arrowRight} />
        </div>
      </div>
    </div>
  );
}
export default React.memo(FileListHeader);
