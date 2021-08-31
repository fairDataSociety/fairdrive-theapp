import React from 'react';
import { StoreProvider } from 'src/store/store';
import { ThemeProvider } from 'src/contexts/themeContext/themeContext';
import Layout from 'src/layout/layout';
import { Toaster } from 'react-hot-toast';

const App = (): JSX.Element => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
      <Toaster />
    </StoreProvider>
  );
};

export default App;
