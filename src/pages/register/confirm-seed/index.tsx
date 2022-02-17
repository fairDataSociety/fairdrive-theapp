import type { NextPage } from 'next';

import { AuthenticationLayout } from '@components/Layouts';
import { ConfirmMnemonic } from '@components/Forms';

const RegisterConfirmSeed: NextPage = () => {
  return (
    <AuthenticationLayout>
      <ConfirmMnemonic />
    </AuthenticationLayout>
  );
};

export default RegisterConfirmSeed;
