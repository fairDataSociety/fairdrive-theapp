import { FC, useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';

const PrivacyPolicy: FC = () => {
  const { trackPageView } = useMatomo();

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
          Privacy Policy
        </h2>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          Fairdrive website and app uses the open source and self-hosted web
          analysis service Matomo. Matomo uses technologies that make it
          possible to recognize the user across multiple pages with the aim of
          analyzing the user patterns (e.g. cookies or device fingerprinting).
          The information recorded by Matomo about the use of this website will
          be stored on our server. Prior to archiving, the IP address will first
          be anonymized.
          <br />
          <br />
          Through Matomo, we are able to collect and analyze data on the use of
          our website by website visitors. This enables us to find out, for
          instance, when which page views occurred and from which region they
          came. In addition, we collect various log files (e.g. IP address,
          referrer, browser and operating system used) and can measure whether
          our website visitors perform certain actions (e.g. clicks, etc.).
          <br />
          <br />
          The use of this analysis tool is based on Art. 6 Sect. 1 lit. f GDPR.
          The website operator has a legitimate interest in the analysis of user
          patterns, in order to optimize the operator’s web offerings and
          advertising. If a corresponding agreement has been requested (e.g. an
          agreement to the storage of cookies), the processing takes place
          exclusively on the basis of Art. 6 para. 1 lit. a GDPR; the agreement
          can be revoked at any time.
          <br />
          <br />
          Completion of a data processing agreement We host Matomo on servers in
          Switzerland, so that all the data and analysis remains with us and is
          not passed on. The servers are provided by Exoscale and their Data
          Protection Agreement can be viewed at:{' '}
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
