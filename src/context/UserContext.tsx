/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, createContext, useState, useEffect } from 'react';

interface UserContext {
  beeUrl: string;
  setBeeUrl: (beeUrl: string) => void;
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
  beeUrl: '',
  setBeeUrl: (beeUrl: string) => {},
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
  let beeurl;
  useEffect(() => {
    beeurl = localStorage.getItem('beeUrl') || process.env.NEXT_PUBLIC_BEE_URL;
  }, []);
  const [beeUrl, setBeeUrl] = useState(beeurl);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        password,
        setPassword,
        address,
        setAddress,
        beeUrl,
        setBeeUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
