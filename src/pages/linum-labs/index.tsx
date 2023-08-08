import { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { MainLayout } from '@components/Layouts';
import { useLocales } from '@context/LocalesContext';

const LinumLabs = () => {
  const { trackPageView } = useMatomo();
  const { intl } = useLocales();

  useEffect(() => {
    trackPageView({
      documentTitle: 'LinumLabs Page',
      href: window.location.href,
    });
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <h2 className="font-semibold text-xl text-color-accents-plum-black dark:text-color-shade-white-night">
          {intl.get('LINUMLABS_PAGE_TITLE')}
        </h2>

        <div className="mt-12 w-full">
          <p className="mb-4">{intl.get('LINUMLABS_PARAGRAPH_1')}</p>

          <p className="mb-4">{intl.get('LINUMLABS_PARAGRAPH_2')}</p>

          <p>{intl.get('LINUMLABS_PARAGRAPH_3')}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LinumLabs;
