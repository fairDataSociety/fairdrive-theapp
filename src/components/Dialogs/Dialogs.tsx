import { useDialogs } from '@context/DialogsContext';
import MetamaskMigrationDialog from './MetamaskMigrationDialog/MetamaskMigrationDialog';
import { useFdpStorage } from '@context/FdpStorageContext';

export default function Dialogs() {
  const { isLoggedIn } = useFdpStorage();
  const { metamaskMigrationOpen, setMetamaskMigrationOpen } = useDialogs();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <MetamaskMigrationDialog
        open={metamaskMigrationOpen}
        onClose={() => setMetamaskMigrationOpen(false)}
      />
    </>
  );
}
