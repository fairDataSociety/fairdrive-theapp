import { Button } from '@components/Buttons';
import { useState } from 'react';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { FieldError, useForm } from 'react-hook-form';
import { AuthenticationInput } from '@components/Inputs';
import { getDefaultNetwork, useFdpStorage } from '@context/FdpStorageContext';
import { Network } from '@data/networks';
import NetworkDropdown from '@components/Dropdowns/NetworkDropdown/NetworkDropdown';
import { LocalStorageKeys } from '@utils/localStorage';
import { useLocales } from '@context/LocalesContext';

interface MetamaskUsernamePasswordProps {
  onConfirm: (username: string, password: string, network: Network) => void;
}

interface FormFields {
  username: string;
  password: string;
  passwordConfirm: string;
}

export default function MetamaskUsernamePassword({
  onConfirm,
}: MetamaskUsernamePasswordProps) {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [network, setNetwork] = useState<Network>(getDefaultNetwork());
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setFdpStorageConfig, fdpClientRef } = useFdpStorage();
  const { intl } = useLocales();

  const onSubmit = async ({ username, password }: FormFields) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      setFdpStorageConfig(network.config);

      const usernameAvailable =
        await fdpClientRef.current.account.ens.isUsernameAvailable(username);

      if (!usernameAvailable) {
        return setError('username', {
          type: 'custom',
          message: intl.get('USERNAME_IS_NOT_AVAILABLE'),
        });
      }

      localStorage.setItem(LocalStorageKeys.NETWORK, String(network.id));

      onConfirm(username, password, network);
    } catch (error) {
      setErrorMessage(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-3">
        <p className="text-sm">{intl.get('PLEASE_CHOOSE_NETWORK')}</p>
      </div>

      <NetworkDropdown className="mb-3" value={network} onChange={setNetwork} />

      <AuthenticationInput
        label={intl.get('USERNAME')}
        id="user_name"
        type="text"
        name="username"
        placeholder={intl.get('TYPE_HERE')}
        useFormRegister={register}
        validationRules={{
          required: intl.get('USERNAME_IS_REQUIRED'),
          minLength: {
            value: 4,
            message: intl.get('USERNAME_MIN_LENGTH_ERROR'),
          },
        }}
        error={errors.username as FieldError}
        errorMessage={errors.username?.message?.toString()}
      />

      <AuthenticationInput
        label={intl.get('PASSWORD')}
        id="password"
        type="password"
        name="password"
        placeholder={intl.get('TYPE_HERE')}
        useFormRegister={register}
        validationRules={{
          required: intl.get('PASSWORD_IS_REQUIRED'),
          minLength: {
            value: 12,
            message: intl.get('PASSWORD_MIN_LENGTH_ERROR'),
          },
        }}
        error={errors.password as FieldError}
        errorMessage={errors.password?.message?.toString()}
      />

      <AuthenticationInput
        label={intl.get('CONFIRM_PASSWORD')}
        id="confirm-password"
        type="password"
        name="confirmPassword"
        placeholder={intl.get('TYPE_HERE')}
        useFormRegister={register}
        validationRules={{
          required: intl.get('PASSWORD_CONFIRMATION_IS_REQUIRED'),
          validate: (value: string) => {
            if (watch('password') != value) {
              return intl.get('PASSWORD_CONFIRMATION_ERROR');
            }
          },
        }}
        error={errors.confirmPassword as FieldError}
        errorMessage={errors.confirmPassword?.message?.toString()}
      />

      {errorMessage && <FeedbackMessage type="error" message={errorMessage} />}

      <div className="mt-14 text-center">
        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          variant="secondary"
          label={intl.get('CONTINUE')}
        />
      </div>
    </form>
  );
}
