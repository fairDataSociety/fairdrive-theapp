import type { NextPage } from 'next';

import { AuthenticationLayout } from '@components/Layouts';
import { RegisterForm } from '@components/Forms';

const Register: NextPage = () => {
  return (
    <AuthenticationLayout>
      <RegisterForm />
    </AuthenticationLayout>
  );
};

export default Register;
