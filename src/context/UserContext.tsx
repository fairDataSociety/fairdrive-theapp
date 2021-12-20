/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, createContext, useState } from 'react';

interface UserContext {
  user: string;
  setUser: (user: string) => void;
  password: string;
  setPassword: (User: string) => void;
}

interface UserContextProps {
  children: ReactNode;
}
const UserContextDefaultValues: UserContext = {
  user: '',
  setUser: (user: string) => {},
  password: '',
  setPassword: (User: string) => {},
};

const UserContext = createContext<UserContext>(UserContextDefaultValues);

const UserProvider: FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        password,
        setPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
