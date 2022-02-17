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
};

const UserContext = createContext<UserContext>(UserContextDefaultValues);

const UserProvider: FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        password,
        setPassword,
        address,
        setAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
