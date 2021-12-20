import { FC } from 'react';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';

interface DriveProps {}

const Drive: FC<DriveProps> = () => {
  return (
    <MainLayout>
      <MainHeader title="Private Pod" />
    </MainLayout>
  );
};

export default Drive;
