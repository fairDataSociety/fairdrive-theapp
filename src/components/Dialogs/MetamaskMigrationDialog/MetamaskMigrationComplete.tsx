import { Button } from '@components/Buttons';

interface MetamaskMigrationCompleteProps {
  onConfirm: () => void;
}

export default function MetamaskMigrationComplete({
  onConfirm,
}: MetamaskMigrationCompleteProps) {
  return (
    <>
      <div className="mt-4">
        <p className="text-sm">
          Congratulations! You have just created an FDS account. Next time you
          can use your username and password to log in to Fairdrive.
        </p>
      </div>

      <div className="mt-5">
        <Button variant="primary-outlined" label="Close" onClick={onConfirm} />
      </div>
    </>
  );
}
