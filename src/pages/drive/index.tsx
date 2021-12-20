import { FC } from 'react';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';
import FileCard from '@components/FileCard/FileCard';

interface DriveProps {}

const Drive: FC<DriveProps> = () => {
  const data = {
    name: 'test',
    content_type: 'image/png',
    size: '123',
    creation_time: '123',
    is_directory: true,
  };
  return (
    <MainLayout>
      <MainHeader title="Private Pod" />
      <FileCard data={data} isDirectory={false}></FileCard>
    </MainLayout>
  );
};

export default Drive;
