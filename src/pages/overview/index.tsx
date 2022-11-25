import { FC, useContext, useEffect } from 'react';
import router from 'next/router';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import ThemeContext from '@context/ThemeContext';

import { MainLayout } from '@components/Layouts';
import { Button } from '@components/Buttons';

import OverviewDriveLight from '@media/UI/overview-drive-light.svg';
import OverviewDriveDark from '@media/UI/overview-drive-dark.svg';

import OverviewExploreLight from '@media/UI/overview-explore-light.svg';
import OverviewExploreDark from '@media/UI/overview-explore-dark.svg';

import OverviewEcosystemLight from '@media/UI/overview-ecosystem-light.svg';
import OverviewEcosystemDark from '@media/UI/overview-ecosystem-dark.svg';

interface OverviewProps {}

const Overview: FC<OverviewProps> = () => {
  const { trackPageView } = useMatomo();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    trackPageView({
      documentTitle: 'Overview Page',
      href: window.location.href,
    });
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <h2 className="font-semibold text-xl text-color-accents-plum-black dark:text-color-shade-white-night">
          Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 w-full">
          <div className="relative flex flex-col h-92 py-8 px-8 shadow-lg dark:bg-color-shade-dark-4-night rounded">
            {theme === 'light' ? (
              <OverviewDriveLight className="inline-block" />
            ) : (
              <OverviewDriveDark className="inline-block" />
            )}

            <h3 className="mt-4 font-semibold text-lg text-color-accents-plum-black dark:text-color-shade-white-night">
              Get started with your Drive
            </h3>

            <p className="mt-2 text-color-shade-light-2-night dark:text-color-shade-light-2-night">
              Start interacting with the Fairtext in Fairdrive, create your
              Subpods and explore new ways to organize your files.
            </p>

            <div
              className="mt-auto bottom-5 w-fit"
              style={{ width: 'fit-content' }}
            >
              <Button
                type="button"
                variant="primary-outlined"
                label="Go to Drive"
                onClick={() => {
                  router.push('/drive');
                }}
              />
            </div>
          </div>

          <div className="relative flex flex-col h-92 py-8 px-8 shadow-lg dark:bg-color-shade-dark-4-night rounded">
            {theme === 'light' ? (
              <OverviewExploreLight className="inline-block" />
            ) : (
              <OverviewExploreDark className="inline-block" />
            )}

            <h3 className="mt-4 font-semibold text-lg text-color-accents-plum-black dark:text-color-shade-white-night">
              Explore DApps
            </h3>

            <p className="mt-2 text-color-shade-light-2-night dark:text-color-shade-light-2-night">
              Explore DApps that are in the Fair Data Society Ecosystem.
            </p>

            <div
              className="mt-auto bottom-5 w-fit"
              style={{ width: 'fit-content ' }}
            >
              <Button
                type="button"
                variant="primary-outlined"
                label="Explore DApps"
                onClick={() => {
                  router.push('/explore');
                }}
              />
            </div>
          </div>

          <div className="relative flex flex-col h-92 py-8 px-8 shadow-lg dark:bg-color-shade-dark-4-night rounded">
            {theme === 'light' ? (
              <OverviewEcosystemLight className="inline-block" />
            ) : (
              <OverviewEcosystemDark className="inline-block" />
            )}

            <h3 className="mt-4 font-semibold text-lg text-color-accents-plum-black dark:text-color-shade-white-night">
              Join our ecosystem
            </h3>

            <p className="mt-2 text-color-shade-light-2-night dark:text-color-shade-light-2-night">
              Develop for Fairdrive and grow the ecosystem.
            </p>

            <a
              href="https://docs.fairos.fairdatasociety.org/api/"
              target="_blank"
              rel="noreferrer"
              className="mt-auto bottom-5 w-fit"
              style={{ width: 'fit-content ' }}
            >
              <Button
                type="button"
                variant="primary-outlined"
                label="Developer Docs"
              />
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Overview;
