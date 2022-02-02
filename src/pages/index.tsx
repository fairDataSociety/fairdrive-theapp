import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';
import { LoginForm } from '@components/Forms';

const Home: NextPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Login Page',
      href: 'https://fairdrive.vercel.app/',
    });
  }, []);

  return (
    <AuthenticationLayout>
      <LoginForm />
    </AuthenticationLayout>
  );
};

export default Home;
