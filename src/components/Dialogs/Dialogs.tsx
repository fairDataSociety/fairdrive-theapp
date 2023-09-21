import { useDialogs } from '@context/DialogsContext';
import MetamaskMigrationDialog from './MetamaskMigrationDialog/MetamaskMigrationDialog';
import { useFdpStorage } from '@context/FdpStorageContext';
import MobileNavigationDrawer from '@components/NavigationBars/MobileNavigationDrawer/MobileNavigationDrawer';

export default function Dialogs() {
  const { isLoggedIn } = useFdpStorage();
  const {
    metamaskMigrationOpen,
    mobileNavigationOpen,
    setMetamaskMigrationOpen,
    setMobileNavigationOpen,
  } = useDialogs();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <MetamaskMigrationDialog
        open={metamaskMigrationOpen}
        onClose={() => setMetamaskMigrationOpen(false)}
      />

      <MobileNavigationDrawer
        open={mobileNavigationOpen}
        onClose={() => setMobileNavigationOpen(false)}
      />
    </>
  );
}
