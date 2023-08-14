import { FC, useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';
import { useLocales } from '@context/LocalesContext';

const Terms: FC = () => {
  const { trackPageView } = useMatomo();
  const { intl } = useLocales();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Terms & Conditions Page',
      href: window.location.href,
    });
  }, []);

  return (
    <AuthenticationLayout hasBackButton={true}>
      <div className="w-full mb-12 pl-24 pr-28">
        <h2 className="font-semibold text-xl dark:text-color-accents-soft-lavender">
          {intl.get('TERMS_OF_USAGE')}
        </h2>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          {intl.get('TERMS_OF_USAGE_PARAGRAPH_1')}
        </p>

        <h3 className="font-bold dark:text-color-accents-soft-lavender">
          {intl.get('DISCLAIMER_OF_LIABILITY_AND_WARRANTIES')}
        </h3>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          {intl.get('TERMS_OF_USAGE_PARAGRAPH_2')}
        </p>

        <h3 className="font-bold dark:text-color-accents-soft-lavender">
          {intl.get('USERS_COMMITMENTS')}
        </h3>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          {intl.get('TERMS_OF_USAGE_PARAGRAPH_3')}
        </p>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          {intl.get('FAIRDRIVE_COPYRIGHT')}
        </p>
      </div>
    </AuthenticationLayout>
  );
};

export default Terms;
