import { useEffect, useState } from 'react';
import { Button } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';

const TEST_MESSAGE = 'fairdrive';

interface BlossomProps {
  onLoginStart: () => void;
  onLoginEnd: (errorMessage?: string) => void;
}

const BlossomLogin = ({ onLoginStart, onLoginEnd }: BlossomProps) => {
  const [isBlossomInstalled, setIsBlossomInstalled] = useState<boolean | null>(
    null
  );
  const { blossom } = useFdpStorage();

  const checkIsBlossomInstalled = async () => {
    let timeout: ReturnType<typeof setTimeout>;

    const cleanup = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };

    try {
      timeout = setTimeout(() => {
        setIsBlossomInstalled(false);
        cleanup();
      }, 1000);

      const testMessage = await blossom.echo(TEST_MESSAGE);

      setIsBlossomInstalled(testMessage === TEST_MESSAGE);
    } catch (error) {
      setIsBlossomInstalled(false);
    } finally {
      cleanup();
    }
  };

  const onLogin = async () => {
    try {
      onLoginStart();
      const allowed =
        await blossom.fdpStorage.personalStorage.requestFullAccess();

      if (!allowed) {
        return onLoginEnd(
          'Fairdrive requires full access to personal storage in order to work properly.'
        );
      }

      onLoginEnd();
    } catch (error) {
      onLoginEnd(`Couldn't login using Blossom. ${error}`);
    }
  };

  useEffect(() => {
    checkIsBlossomInstalled();
  }, []);

  if (isBlossomInstalled === null) {
    return null;
  }

  return (
    <div className="w-full md:w-98 mt-12 font-semibold text-center py-5 border-t-2 border-b-2 border-color-accents-purple-heavy rounded text-color-accents-plum-black dark:text-color-accents-grey-pastel">
      {isBlossomInstalled ? (
        <>
          <div className="mb-5">
            Blossom extension detected. You can login using your Blossom
            extension.
          </div>
          <Button
            type="button"
            variant="secondary"
            label="Login With Blossom"
            onClick={onLogin}
          />
        </>
      ) : (
        <div>
          You can login using the Blossom extension.{' '}
          <a
            className="text-color-accents-purple-heavy dark:text-color-shade-light-1-night"
            href="https://chrome.google.com/webstore/detail/blossom/caedjloenbhibmaeffockkiallpngmmd"
            target="_blank"
            rel="noreferrer"
          >
            Click here to install it.
          </a>
        </div>
      )}
    </div>
  );
};

export default BlossomLogin;
