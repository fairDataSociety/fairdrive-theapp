import { Button } from '@components/Buttons';

interface MetamaskMigrationCompleteProps {
  address: string;
  username: string;
  onConfirm: () => void;
}

export default function MetamaskMigrationComplete({
  address,
  username,
  onConfirm,
}: MetamaskMigrationCompleteProps) {
  return (
    <>
      <div className="mt-4">
        <p className="text-sm">
          Congratulations! You have just created an FDS account. Next time you
          can use your username and password to log in to Fairdrive.
        </p>
        <div className="mt-2">
          <div>
            <span className="text-sm">Address:</span> {address}
          </div>
          <div>
            <span className="text-sm">Username:</span> {username}
          </div>
          <div>
            <span className="text-sm">Password:</span>{' '}
            <span className="blurred-text select-none">password</span>
          </div>
          <div>
            <span className="text-sm">Mnemonic: </span>
            <span className="blurred-text select-none">
              search april vessel execute grow album drama scissors shrimp
              gravity tail dolphin tank border shiver then loop stereo oven
              reward arrest maze base control
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Button variant="primary-outlined" label="Close" onClick={onConfirm} />
      </div>
    </>
  );
}
