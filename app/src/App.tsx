import React from 'react';
import { StoreProvider } from 'src/store/store';
import { ThemeProvider } from 'src/contexts/themeContext/themeContext';
import MainWrapper from 'src/containers/MainWrapper';
import { Toaster } from 'react-hot-toast';

const App = (): JSX.Element => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <MainWrapper />
      </ThemeProvider>
      <Toaster />
    </StoreProvider>
  );
};

export default App;
