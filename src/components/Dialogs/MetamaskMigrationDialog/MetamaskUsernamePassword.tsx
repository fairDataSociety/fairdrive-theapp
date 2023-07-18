import { Button } from '@components/Buttons';
import { useState } from 'react';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { useForm } from 'react-hook-form';
import { AuthenticationInput } from '@components/Inputs';
import { getDefaultNetwork, useFdpStorage } from '@context/FdpStorageContext';
import { Network } from '@data/networks';
import NetworkDropdown from '@components/Dropdowns/NetworkDropdown/NetworkDropdown';

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
  const { setEnsConfig } = useFdpStorage();

  const onSubmit = async ({ username, password }: FormFields) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const fdpClient = setEnsConfig(network.config);

      const usernameAvailable = await fdpClient.account.ens.isUsernameAvailable(
        username
      );

      if (!usernameAvailable) {
        return setError('username', {
          type: 'custom',
          message: 'Username is not available.',
        });
      }

      localStorage.setItem('network', String(network.id));

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
        <p className="text-sm">
          Please choose network you want to migrate your account to and type
          username and password.
        </p>
      </div>

      <NetworkDropdown className="mb-3" value={network} onChange={setNetwork} />

      <AuthenticationInput
        label="username"
        id="user_name"
        type="text"
        name="username"
        placeholder="Type here"
        useFormRegister={register}
        validationRules={{
          required: 'Username is required',
          minLength: {
            value: 4,
            message: 'Username field needs to contain at least 4 characters',
          },
        }}
        // @ts-ignore
        error={errors.username}
        errorMessage={errors.username?.message?.toString()}
      />

      <AuthenticationInput
        label="password"
        id="password"
        type="password"
        name="password"
        placeholder="Type here"
        useFormRegister={register}
        validationRules={{
          required: 'Password is required',
          minLength: {
            value: 12,
            message: 'Password must be at least 12 characters long.',
          },
        }}
        // @ts-ignore
        error={errors.password}
        errorMessage={errors.password?.message?.toString()}
      />

      <AuthenticationInput
        label="Confirm Password"
        id="confirm-password"
        type="password"
        name="confirmPassword"
        placeholder="Type here"
        useFormRegister={register}
        validationRules={{
          required: 'Password confirmation is required',
          validate: (value: string) => {
            if (watch('password') != value) {
              return "Password confirmation doesn't match with password.";
            }
          },
        }}
        // @ts-ignore
        error={errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message?.toString()}
      />

      {errorMessage && <FeedbackMessage type="error" message={errorMessage} />}

      <div className="mt-14 text-center">
        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          variant="secondary"
          label="Continue"
        />
      </div>
    </form>
  );
}
