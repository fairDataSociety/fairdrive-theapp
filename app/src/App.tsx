import React from 'react';
import AuthProvider from 'src/machines/auth';
import { StoreProvider } from 'src/store/store';
import { PodStateMachineProvider } from 'src/contexts/podStateMachine';
import { ThemeProvider } from 'src/contexts/themeContext/themeContext';
import Layout from 'src/layout/layout';
import { Toaster } from 'react-hot-toast';

const App = (): JSX.Element => {
  return (
    <>
      <AuthProvider>
        <PodStateMachineProvider>
          <StoreProvider>
            <ThemeProvider>
              <Layout />
            </ThemeProvider>
          </StoreProvider>
        </PodStateMachineProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
};

export default App;
