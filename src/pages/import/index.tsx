import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';
import { ImportUserForm } from '@components/Forms';

const ImportUser: NextPage = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Import Page',
      href: window.location.href,
    });
  }, []);

  return (
    <AuthenticationLayout hasBackButton={true}>
      <ImportUserForm />
    </AuthenticationLayout>
  );
};

export default ImportUser;
