import { Button } from '@components/Buttons';
import { useLocales } from '@context/LocalesContext';

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
  const { intl } = useLocales();

  return (
    <>
      <div className="mt-4">
        <p className="text-sm">
          {intl.get('SUCCESSFUL_METAMASK_ACCOUNT_MIGRATION')}
        </p>
        <div className="mt-2">
          <div>
            <span className="text-sm">{intl.get('ADDRESS')}:</span> {address}
          </div>
          <div>
            <span className="text-sm">{intl.get('USERNAME')}:</span> {username}
          </div>
          <div>
            <span className="text-sm">{intl.get('PASSWORD')}:</span>{' '}
            <span className="blurred-text select-none">password</span>
          </div>
          <div>
            <span className="text-sm">{intl.get('MNEMONIC')}: </span>
            <span className="blurred-text select-none">
              search april vessel execute grow album drama scissors shrimp
              gravity tail dolphin tank border shiver then loop stereo oven
              reward arrest maze base control
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Button
          variant="primary-outlined"
          label={intl.get('CLOSE')}
          onClick={onConfirm}
        />
      </div>
    </>
  );
}
