import React from 'react';
import { StoreProvider } from 'src/store/store';
import { PodStateMachineProvider } from 'src/contexts/podStateMachine';
import { ThemeProvider } from 'src/contexts/themeContext/themeContext';
import Layout from 'src/layout/layout';
import { Toaster } from 'react-hot-toast';

const App = (): JSX.Element => {
  return (
    <>
      <PodStateMachineProvider>
        <StoreProvider>
          <ThemeProvider>
            <Layout />
          </ThemeProvider>
        </StoreProvider>
      </PodStateMachineProvider>

      <Toaster />
    </>
  );
};

export default App;
