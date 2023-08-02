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
          Your FDS Lite account, managed with Metamask, can be seamlessly
          migrated to an FDS Portable account. This enables you to use a
          username and password for login on mobile devices and other dApps.
        </p>
      </div>

      <div className="mt-5">
        <Button variant="primary-outlined" label="Start" onClick={onConfirm} />
      </div>
    </>
  );
}
