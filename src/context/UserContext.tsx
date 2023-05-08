/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, createContext, useState } from 'react';

interface UserContext {
  user: string;
  setUser: (user: string) => void;
  password: string;
  setPassword: (user: string) => void;
  address: string;
  setAddress: (address: string) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string) => void;
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
};

const UserContext = createContext<UserContext>(UserContextDefaultValues);

const UserProvider: FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
