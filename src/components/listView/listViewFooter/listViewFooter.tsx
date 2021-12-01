import React, { useMemo } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './listViewFooterStyles';
import { BaseSelect } from 'src/shared/BaseSelect/BaseSelect';
import { ChevronDown } from 'src/components/icons/icons';

export interface Props {
  pageSizes: number[];
  pageSize: number;
  index: number;
  total: number;
  onPageSizeChange: (pageSize: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

function ListViewFooter(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });
  const {
    index,
    total,
    pageSize,
    pageSizes,
    onPageSizeChange,
    onNextPage,
    onPrevPage,
  } = props;

  const options = useMemo(
    () =>
      pageSizes.map((size, index) => ({
        id: index,
        label: String(size),
      })),
    [pageSizes]
  );

  const getSelectedPageSize = (id: number) => {
    return Number(options.find((option) => option.id === id).label);
  };

  const getSelectedPageSizeId = (pageSize: number) => {
    return options.find((option) => option.label === String(pageSize)).id;
  };

  const startIndex = index + 1;
  const endIndex = index + pageSize < total ? index + pageSize : total;

  return (
    <div className={classes.footerWrapper}>
      <div className={classes.rowPerPage}>
        Rows per page:
        <BaseSelect
          option={getSelectedPageSizeId(pageSize)}
          changeOption={(id) => onPageSizeChange(getSelectedPageSize(id))}
          options={options}
        />
      </div>
      <div className={classes.pagination}>
        {startIndex}-{endIndex} of {total}
        <div className={classes.indicatorGroup}>
          <ChevronDown className={classes.arrowLeft} onClick={onPrevPage} />
          <ChevronDown className={classes.arrowRight} onClick={onNextPage} />
        </div>
      </div>
    </div>
  );
}
export default React.memo(ListViewFooter);
