import { FC, useContext, useEffect } from 'react';
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

import LinumLabsLightIcon from '@media/branding/linum-labs-logo-light.svg';
import LinumLabsDarkIcon from '@media/branding/linum-labs-logo-dark.svg';

import OverviewCard from './overview-card';

interface OverviewProps {}

function AwardImages() {
  return (
    <div className="flex flex-col sm:flex-row">
      <img
        className="mr-2 mb-2 sm:mb-0"
        width="80px"
        src="/media/general/mydata-operator-2021.png"
        alt="MyData Operator 2021"
      />

      <img
        width="80px"
        src="/media/general/mydata-operator-2022.png"
        alt="MyData Operator 2022"
      />
    </div>
  );
}

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
          <OverviewCard
            theme={theme}
            title="Get started with your Drive"
            description="Start interacting with the Fairtext in Fairdrive, create your
            Subpods and explore new ways to organize your files."
            imageLight={<OverviewDriveLight className="inline-block" />}
            imageDark={<OverviewDriveDark className="inline-block" />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label="Go to Drive"
                to="/drive"
              />
            }
          />

          <OverviewCard
            theme={theme}
            title="Explore DApps"
            description="Explore DApps that are in the Fair Data Society Ecosystem."
            imageLight={<OverviewExploreLight className="inline-block" />}
            imageDark={<OverviewExploreDark className="inline-block" />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label="Explore DApps"
                to="/explore"
              />
            }
          />

          <OverviewCard
            theme={theme}
            title="Join our ecosystem"
            description="Develop for Fairdrive and grow the ecosystem."
            imageLight={<OverviewEcosystemLight className="inline-block" />}
            imageDark={<OverviewEcosystemDark className="inline-block" />}
            button={
              <a
                href="https://fairdataprotocol.bzz.link/"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  type="button"
                  variant="primary-outlined"
                  label="Developer Docs"
                />
              </a>
            }
          />

          <OverviewCard
            theme={theme}
            title="A Fruitful Partnership with LinumLabs"
            description="In the ever-evolving landscape of data-driven technologies, partnerships play a crucial role in driving innovation and fostering mutual growth."
            imageLight={<LinumLabsLightIcon />}
            imageDark={<LinumLabsDarkIcon />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label="Read More"
                to="/linum-labs"
              />
            }
          />

          <OverviewCard
            theme={theme}
            title="Our Role as MyData Operators in 2021 and 2022"
            description="As MyData Operators, we believe in empowering individuals to have greater control over their personal data while unlocking its potential for creating positive impact."
            imageLight={<AwardImages />}
            imageDark={<AwardImages />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label="Read More"
                to="/my-data-operator"
              />
            }
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Overview;
