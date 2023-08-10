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
import { useLocales } from '@context/LocalesContext';

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
  const { intl } = useLocales();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Overview Page',
      href: window.location.href,
    });
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 w-full">
          <OverviewCard
            theme={theme}
            title={intl.get('GET_STARTED_WITH_YOUR_DRIVE')}
            description={intl.get('GET_STARTED_CARD_DESCRIPTION')}
            imageLight={<OverviewDriveLight className="inline-block" />}
            imageDark={<OverviewDriveDark className="inline-block" />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label={intl.get('GO_TO_DRIVE')}
                to="/drive"
              />
            }
          />

          <OverviewCard
            theme={theme}
            title={intl.get('EXPLORE_DAPPS')}
            description={intl.get('EXPLORE_DAPPS_CARD_DESCRIPTION')}
            imageLight={<OverviewExploreLight className="inline-block" />}
            imageDark={<OverviewExploreDark className="inline-block" />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label={intl.get('EXPLORE_DAPPS')}
                to="/explore"
              />
            }
          />

          <OverviewCard
            theme={theme}
            title={intl.get('JOIN_OUR_ECOSYSTEM')}
            description={intl.get('JOIN_OUR_ECOSYSTEM_CARD_DESCRIPTION')}
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
                  label={intl.get('DEVELOPER_DOCS')}
                />
              </a>
            }
          />

          <OverviewCard
            theme={theme}
            title={intl.get('LINUMLABS_PAGE_TITLE')}
            description={intl.get('LINUMLABS_CARD_DESCRIPTION')}
            imageLight={<LinumLabsLightIcon />}
            imageDark={<LinumLabsDarkIcon />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label={intl.get('READ_MORE')}
                to="/linum-labs"
              />
            }
          />

          <OverviewCard
            theme={theme}
            title={intl.get('MYDATA_OPERATORS_PAGE_TITLE')}
            description={intl.get('MYDATA_OPERATORS_CARD_DESCRIPTION')}
            imageLight={<AwardImages />}
            imageDark={<AwardImages />}
            button={
              <Button
                type="button"
                variant="primary-outlined"
                label={intl.get('READ_MORE')}
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
