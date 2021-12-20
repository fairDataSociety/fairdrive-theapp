import { FC } from 'react';

import dapps from '@data/explore-dapps.json';

import { MainLayout } from '@components/Layouts';
// import { MainHeader } from '@components/Headers';
import { ExploreCard } from '@components/Cards';

interface ExploreProps {}

const Explore: FC<ExploreProps> = () => {
  return (
    <MainLayout>
      {/* <MainHeader title="Explore DApps" /> */}

      <div className="grid grid-cols-5 gap-6">
        {dapps.map((dapp) => {
          return (
            <ExploreCard
              key={dapp.name}
              name={dapp.name}
              link={dapp.link}
              description={dapp.description}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Explore;
