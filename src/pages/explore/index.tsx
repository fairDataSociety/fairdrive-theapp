import { FC, useEffect, useContext } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import ThemeContext from '@context/ThemeContext';
import selectDappRouter, { Dapp } from '@data/explore-dapps';

import SearchContext from '@context/SearchContext';

import { MainLayout } from '@components/Layouts';
import { ExploreCard } from '@components/Cards';

import SearchResultsLightIcon from '@media/UI/search-results-light.svg';
import SearchResultsDarkIcon from '@media/UI/search-results-dark.svg';
import { useRouter } from 'next/router';
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';

interface ExploreProps {}

const Explore: FC<ExploreProps> = () => {
  const { trackPageView } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const { search, updateSearch } = useContext(SearchContext);
  let href = window.location.href;
  useEffect(() => {
    trackPageView({
      documentTitle: 'Explore Page',
      href: window.location.href,
    });
  }, []);

  useEffect(() => {
    updateSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterDapps = (dapp: Dapp) => {
    for (let i = 0; i < dapp.tags.length; i++) {
      if (dapp.tags[i].includes(search)) return true;
    }

    return dapp.name.toLowerCase().includes(search.toLocaleLowerCase());
  };

  return (
    <MainLayout>
      <h2 className="font-semibold text-xl text-color-accents-plum-black dark:text-color-shade-white-night">
        Explore DApps
      </h2>

      {search.length > 0 ? (
        <div className="flex justify-start items-center mt-10">
          <span>
            {theme === 'light' ? (
              <SearchResultsLightIcon className="inline-block mr-2" />
            ) : (
              <SearchResultsDarkIcon className="inline-block mr-2" />
            )}
          </span>

          <span className="text-2xl font-semibold text-color-accents-grey-lavendar">
            {search}
          </span>
        </div>
      ) : null}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {selectDappRouter(href)
          .filter(filterDapps)
          .map((dapp) => {
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
