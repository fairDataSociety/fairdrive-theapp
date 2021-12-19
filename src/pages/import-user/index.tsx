import type { NextPage } from 'next';

import { AuthenticationLayout } from '@components/Layouts';
import { ImportUserForm } from '@components/Forms';

const ImportUser: NextPage = () => {
  return (
    <AuthenticationLayout hasBackButton={true}>
      <ImportUserForm />
    </AuthenticationLayout>
  );
};

export default ImportUser;
