import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';
import { LoginForm } from '@components/Forms';
import SaveInvite from './invite/save-invite';

const Home: NextPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Login Page',
      href: window.location.href,
    });
  }, []);

  return (
    <AuthenticationLayout>
      <SaveInvite />
      <LoginForm />
    </AuthenticationLayout>
  );
};

export default Home;
