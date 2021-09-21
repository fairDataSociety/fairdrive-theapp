import React from 'react';
import AuthProvider from 'src/machines/auth';
import PodProvider from 'src/machines/pod';
import { StoreProvider } from 'src/store/store';
import { PodStateMachineProvider } from 'src/contexts/podStateMachine';
import { ThemeProvider } from 'src/contexts/themeContext/themeContext';
import Layout from 'src/layout/layout';
import { Toaster } from 'react-hot-toast';
import { inspect } from '@xstate/inspect';

// xState machines debugging
if (process.env.NODE_ENV !== 'production') {
  inspect({
    url: 'https://statecharts.io/inspect',
    iframe: false,
  });
}

const App = (): JSX.Element => {
  return (
    <>
      <AuthProvider>
        <PodProvider>
          <PodStateMachineProvider>
            <StoreProvider>
              <ThemeProvider>
                <Layout />
              </ThemeProvider>
            </StoreProvider>
          </PodStateMachineProvider>
        </PodProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
};

export default App;
