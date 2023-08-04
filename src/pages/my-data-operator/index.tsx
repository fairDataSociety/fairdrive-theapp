import { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { MainLayout } from '@components/Layouts';

const MyDataOperator = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'MyData Operator Page',
      href: window.location.href,
    });
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <h2 className="font-semibold text-xl text-color-accents-plum-black dark:text-color-shade-white-night">
          Our Role as MyData Operators in 2021 and 2022
        </h2>

        <div className="mt-12 w-full">
          <p className="mb-4">
            As MyData Operators, we believe in empowering individuals to have
            greater control over their personal data while unlocking its
            potential for creating positive impact. During the years 2021 and
            2022, our collaborative efforts yielded remarkable achievements as
            MyData Operators:
          </p>

          <p className="mb-4">
            <b>Enhanced Data Protection:</b> Through a combination of advanced
            encryption techniques and user-centric protocols, we fortified the
            security of individuals&apos; data, ensuring its safe storage and
            seamless utilization.
          </p>

          <p className="mb-4">
            <b>User Empowerment:</b> Our joint initiatives provided individuals
            with transparent access to their data and the ability to grant
            permission for its use, thereby promoting trust and empowering users
            to control their data&apos;s destiny.
          </p>

          <p className="mb-4">
            <b>Innovation in Data Sharing:</b> Together, we pushed the
            boundaries of data sharing models by devising mechanisms that
            facilitated secure and privacy-preserving data exchanges between
            stakeholders, unlocking new possibilities for research and
            development.
          </p>

          <p className="mb-4">
            <b>Privacy by Design:</b> As advocates of privacy by design, we
            implemented stringent measures to ensure data privacy at every
            stage, setting a precedent for responsible data practices within our
            industries.
          </p>

          <p className="mb-4">
            As MyData Operators, we remain committed to empowering individuals
            and businesses alike, offering them the tools they need to leverage
            the power of data responsibly. Looking ahead, we are excited about
            the future possibilities that arise from such fruitful
            collaborations and remain dedicated to shaping a data-driven world
            that places individuals at the heart of the data ecosystem.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyDataOperator;
