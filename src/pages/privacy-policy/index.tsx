import { FC, useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';
import { useLocales } from '@context/LocalesContext';

const PrivacyPolicy: FC = () => {
  const { trackPageView } = useMatomo();
  const { intl } = useLocales();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Privacy Policy Page',
      href: window.location.href,
    });
  }, []);

  return (
    <AuthenticationLayout hasBackButton={true}>
      <div className="w-full mb-12 pl-24 pr-28">
        <h2 className="font-semibold text-xl dark:text-color-accents-soft-lavender">
          {intl.get('PRIVACY_POLICY')}
        </h2>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          {intl.get('PRIVACY_POLICY_PARAGRAPH_1')}
          <br />
          <br />
          {intl.get('PRIVACY_POLICY_PARAGRAPH_2')}
          <br />
          <br />
          {intl.get('PRIVACY_POLICY_PARAGRAPH_3')}
          <br />
          <br />
          {intl.get('PRIVACY_POLICY_PARAGRAPH_4')}{' '}
          <a
            href="https://www.exoscale.com/dpa/"
            target="_blank"
            rel="noreferrer"
            className="text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar"
          >
            https://www.exoscale.com/dpa/
          </a>
        </p>
      </div>
    </AuthenticationLayout>
  );
};

export default PrivacyPolicy;
