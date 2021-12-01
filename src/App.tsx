import React from 'react';
import Matomo from 'src/contexts/matomo';
import AuthProvider from 'src/machines/auth';
import PodProvider from 'src/machines/pod';
import FileProvider from 'src/machines/file';
import DownloadProvider from 'src/machines/download';
import { ThemeProvider } from 'src/contexts/themeContext/themeContext';
import { ModalProvider } from 'src/contexts/modalContext';
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
      <Matomo>
        <AuthProvider>
          <PodProvider>
            <FileProvider>
              <DownloadProvider>
                <ThemeProvider>
                  <ModalProvider>
                    <Layout />
                  </ModalProvider>
                </ThemeProvider>
              </DownloadProvider>
            </FileProvider>
          </PodProvider>
        </AuthProvider>
      </Matomo>
      <Toaster />
    </>
  );
};

export default App;
