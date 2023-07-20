import { Button } from '@components/Buttons';

interface MetamaskIntroContentProps {
  onConfirm: () => void;
}

export default function MetamaskIntroContent({
  onConfirm,
}: MetamaskIntroContentProps) {
  return (
    <>
      <div className="mt-4">
        <p className="text-sm">
          Migrate your Metamask account to FDS portable account and discover
          other dApps with portable account.
        </p>
      </div>

      <div className="mt-5">
        <Button variant="primary-outlined" label="Start" onClick={onConfirm} />
      </div>
    </>
  );
}
