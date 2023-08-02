import { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { MainLayout } from '@components/Layouts';

const LinumLabs = () => {
  const { trackPageView } = useMatomo();

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
          A Fruitful Partnership with LinumLabs
        </h2>

        <div className="mt-12 w-full">
          <p className="mb-4">
            In the ever-evolving landscape of data-driven technologies,
            partnerships play a crucial role in driving innovation and fostering
            mutual growth. For the years, we had the privilege of collaborating
            with LinumLabs, a dynamic and forward-thinking organization, to make
            strides in the realm of our operations.
          </p>

          <p className="mb-4">
            The partnership between our two organizations was born out of a
            shared vision for a more transparent and user-centric approach to
            data management. Together with LinumLabs, we embarked on a journey
            to create cutting-edge solutions that harness the power of data
            while adhering to strict privacy and security standards. This
            synergy allowed us to blend their expertise in blockchain technology
            and data governance with our proficiency in data analytics and
            user-oriented systems.
          </p>

          <p>
            The partnership with LinumLabs has been a transformative experience,
            fostering innovation and responsible data management practices.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LinumLabs;
