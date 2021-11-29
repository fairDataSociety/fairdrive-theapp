import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useMemo } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import { formatDate } from 'src/helpers';
import {
  CookieProviderContext,
  States as CookieStates,
} from 'src/machines/cookie';
import { PodProviderContext } from 'src/machines/pod';
import ListView from '../listView/listView';
import ListViewBody from '../listView/listViewBody/listViewBody';
import ListViewFooter from '../listView/listViewFooter/listViewFooter';
import ListViewHeader from '../listView/listViewHeader/listViewHeader';
import useStyles from './cookieListStyles';

const CHECKMARK = <span>&#9989;</span>;

function CookieList() {
  const { PodMachineStore } = useContext(PodProviderContext);
  const { CookieMachineStore, CookieMachineActions } = useContext(
    CookieProviderContext
  );
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });
  const { cookies, index, size } = CookieMachineStore.context;

  const getDirectories = () => PodMachineStore.context.directoryData.dirs;

  const domainDirectories = useMemo(() => {
    return getDirectories().filter(
      (directory) => !directory.name.startsWith('.')
    );
  }, [getDirectories()]);

  useEffect(() => {
    if (CookieMachineStore.value === CookieStates.IDLE) {
      CookieMachineActions.loadPage(domainDirectories, 0, size);
    }
  }, []);

  const onPageSizeChange = (pageSize: number) => {
    CookieMachineActions.loadPage(domainDirectories, index, pageSize);
  };

  const onPrevPageClick = () => {
    const newIndex = index - size;
    if (newIndex >= 0) {
      CookieMachineActions.loadPage(domainDirectories, newIndex, size);
    }
  };

  const onNextPageClick = () => {
    const newIndex = index + size;
    if (newIndex <= domainDirectories.length) {
      CookieMachineActions.loadPage(domainDirectories, newIndex, size);
    }
  };

  const loading =
    CookieMachineStore.value === CookieStates.IDLE ||
    CookieMachineStore.value === CookieStates.LOADING;
  const error = CookieMachineStore.value === CookieStates.ERROR;

  return (
    <ListView>
      <ListViewHeader>
        <div className={classes.name}>Name</div>
        <div className={classes.check}>Session</div>
        <div className={classes.check}>Secure</div>
        <div className={classes.domain}>Domain</div>
        <div className={classes.date}>Expiration Date</div>
      </ListViewHeader>
      <ListViewBody>
        {loading && (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        )}
        {!loading &&
          !error &&
          cookies.map((cookie, index) => (
            <div className={classes.row} key={index}>
              <div className={classes.name}>{cookie.name}</div>
              <div className={classes.check}>
                {cookie.session ? CHECKMARK : ''}
              </div>
              <div className={classes.check}>
                {cookie.secure ? CHECKMARK : ''}
              </div>
              <div className={classes.domain}>{cookie.domain}</div>
              <div className={classes.date}>
                {formatDate(String(cookie.expirationDate), true)}
              </div>
            </div>
          ))}
      </ListViewBody>
      <ListViewFooter
        index={index}
        total={domainDirectories.length}
        pageSize={size}
        pageSizes={[5, 10, 15, 20]}
        onPageSizeChange={onPageSizeChange}
        onPrevPage={onPrevPageClick}
        onNextPage={onNextPageClick}
      />
    </ListView>
  );
}

export default React.memo(CookieList);
