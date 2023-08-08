import { Button } from '@components/Buttons';
import { useLocales } from '@context/LocalesContext';

interface MetamaskIntroContentProps {
  onConfirm: () => void;
}

export default function MetamaskIntroContent({
  onConfirm,
}: MetamaskIntroContentProps) {
  const { intl } = useLocales();

  return (
    <>
      <div className="mt-4">
        <p className="text-sm">
          {intl.get('METAMASK_ACCOUNT_MIGRATION_EXPLANATION')}
        </p>
      </div>

      <div className="mt-5">
        <Button
          variant="primary-outlined"
          label={intl.get('START')}
          onClick={onConfirm}
        />
      </div>
    </>
  );
}
