import { FC } from 'react';

import dapps from '@data/explore-dapps.json';

import { MainLayout } from '@components/Layouts';
import { ExploreCard } from '@components/Cards';

interface ExploreProps {}

const Explore: FC<ExploreProps> = () => {
  return (
    <MainLayout>
      <h2 className="font-semibold text-xl text-color-accents-plum-black dark:text-color-shade-white-night">
        Explore DApps
      </h2>

      <div className="mt-10 grid grid-cols-5 gap-6">
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
