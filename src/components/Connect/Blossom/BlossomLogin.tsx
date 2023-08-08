import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';
import blossomImg from '@media/UI/blossom.png';
import Spinner from '@components/Spinner/Spinner';
import BlossomNotFoundModal from '@components/Modals/BlossomNotFoundModal/BlossomNotFoundModal';
import UserContext from '@context/UserContext';
import { useLocales } from '@context/LocalesContext';

const TEST_MESSAGE = 'fairdrive';

const BlossomLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const { blossom, setIsLoggedIn, setFdpStorageType, setLoginType } =
    useFdpStorage();
  const router = useRouter();
  const { setUser, setErrorMessage } = useContext(UserContext);
  const { intl } = useLocales();

  const checkIsBlossomInstalled = () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve, reject) => {
      let timeout: ReturnType<typeof setTimeout>;

      const cleanup = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
      };

      try {
        timeout = setTimeout(() => {
          reject('Timeout error');
          cleanup();
        }, 1000);

        const testMessage = await blossom.echo(TEST_MESSAGE);

        testMessage === TEST_MESSAGE ? resolve() : reject();
      } catch (error) {
        reject(error);
      } finally {
        cleanup();
      }
    });
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      await checkIsBlossomInstalled();
    } catch (error) {
      setLoading(false);
      setShowModal(true);
      return;
    }

    try {
      setErrorMessage(null);
      const allowed =
        await blossom.fdpStorage.personalStorage.requestFullAccess();

      if (!allowed) {
        return setErrorMessage(intl.get('BLOSSOM_ERROR_MESSAGE'));
      }

      setFdpStorageType('blossom');
      setIsLoggedIn(true);
      setLoginType('blossom');
      setUser(intl.get('BLOSSOM_USER'));
      router.push('/overview');
    } catch (error) {
      console.error(error);

      setErrorMessage(`${intl.get('COULDNT_LOGIN_USING_BLOSSOM')} ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="tertiary-outlined"
        label="Blossom"
        className="w-28 h-10 relative text-color-accents-purple-black dark:text-color-accents-grey-lavendar"
        disabled={loading}
        icon={
          loading ? (
            <Spinner className="absolute top-3 left-6" />
          ) : (
            <img
              className="inline-block ml-2"
              style={{ width: '20px' }}
              src={blossomImg.src}
              alt="blossom"
            />
          )
        }
        onClick={onLogin}
      />
      <BlossomNotFoundModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
};

export default BlossomLogin;
