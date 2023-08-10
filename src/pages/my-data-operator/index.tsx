import { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { MainLayout } from '@components/Layouts';
import { useLocales } from '@context/LocalesContext';

const MyDataOperator = () => {
  const { trackPageView } = useMatomo();
  const { intl } = useLocales();

  useEffect(() => {
    trackPageView({
      documentTitle: 'MyData Operator Page',
      href: window.location.href,
    });
  }, []);

  return (
    <MainLayout>
      <div className="w-full text-color-accents-plum-black dark:text-color-shade-white-night">
        <h2 className="font-semibold text-xl">
          {intl.get('MYDATA_OPERATORS_PAGE_TITLE')}
        </h2>

        <div className="mt-12 w-full">
          <p className="mb-4">{intl.get('MYDATA_OPERATORS_PARAGRAPH_1')}</p>

          <p className="mb-4">
            <b>{intl.get('MYDATA_OPERATORS_PARAGRAPH_2_START')}</b>{' '}
            {intl.get('MYDATA_OPERATORS_PARAGRAPH_2')}
          </p>

          <p className="mb-4">
            <b>{intl.get('MYDATA_OPERATORS_PARAGRAPH_3_START')}</b>{' '}
            {intl.get('MYDATA_OPERATORS_PARAGRAPH_3')}
          </p>

          <p className="mb-4">
            <b>{intl.get('MYDATA_OPERATORS_PARAGRAPH_4_START')}</b>{' '}
            {intl.get('MYDATA_OPERATORS_PARAGRAPH_4')}
          </p>

          <p className="mb-4">
            <b>{intl.get('MYDATA_OPERATORS_PARAGRAPH_5_START')}</b>{' '}
            {intl.get('MYDATA_OPERATORS_PARAGRAPH_5')}
          </p>

          <p className="mb-4">{intl.get('MYDATA_OPERATORS_PARAGRAPH_6')}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyDataOperator;
