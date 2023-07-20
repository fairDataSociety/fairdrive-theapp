/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { LocalStorageKeys } from '@utils/localStorage';
import { FC, ReactNode, createContext, useState } from 'react';

export type MetamaskMigrationDialogStatus = undefined | 'closed' | 'completed';

interface UserContext {
  user: string;
  setUser: (user: string) => void;
  password: string;
  setPassword: (user: string) => void;
  address: string;
  setAddress: (address: string) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string) => void;
  metamaskMigrationNotification: MetamaskMigrationDialogStatus;
  setMetamaskMigrationNotification: (
    status: MetamaskMigrationDialogStatus
  ) => void;
}

interface UserContextProps {
  children: ReactNode;
}
const UserContextDefaultValues: UserContext = {
  user: '',
  setUser: (user: string) => {},
  password: '',
  setPassword: (User: string) => {},
  address: '',
  setAddress: (address: string) => {},
  errorMessage: null,
  setErrorMessage: (errorMessage: string) => {},
  metamaskMigrationNotification: undefined,
  setMetamaskMigrationNotification: () => {},
};

const UserContext = createContext<UserContext>(UserContextDefaultValues);

const UserProvider: FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getMetamaskMigrationNotification =
    (): MetamaskMigrationDialogStatus => {
      return localStorage.getItem(
        LocalStorageKeys.METAMASK_MIGRATION_DIALOG + '-' + address
      ) as MetamaskMigrationDialogStatus;
    };

  const [metamaskMigration, setMetamaskMigration] = useState(
    getMetamaskMigrationNotification()
  );

  const setMetamaskMigrationNotification = (
    status: MetamaskMigrationDialogStatus
  ) => {
    localStorage.setItem(
      LocalStorageKeys.METAMASK_MIGRATION_DIALOG + '-' + address,
      status
    );
    setMetamaskMigration(status);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        password,
        setPassword,
        address,
        setAddress,
        errorMessage,
        setErrorMessage,
        metamaskMigrationNotification: metamaskMigration,
        setMetamaskMigrationNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
