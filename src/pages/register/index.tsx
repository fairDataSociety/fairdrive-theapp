import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';
import { RegisterForm } from '@components/Forms';

const Register: NextPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Register Page',
      href: window.location.href,
    });
  }, []);

  return (
    <AuthenticationLayout>
      <RegisterForm />
    </AuthenticationLayout>
  );
};

export default Register;
