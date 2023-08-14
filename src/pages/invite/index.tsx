import { FC, useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { MainLayout } from '@components/Layouts';
import InviteComponent from '@components/Invite/Invite';
import { useLocales } from '@context/LocalesContext';

interface InviteProps {}

const Invite: FC<InviteProps> = () => {
  const { trackPageView } = useMatomo();
  const { intl } = useLocales();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Invite Page',
      href: window.location.href,
    });
  }, []);

  return (
    <MainLayout>
      <h2 className="font-semibold text-xl text-color-accents-plum-black dark:text-color-shade-white-night">
        {intl.get('INVITE_CREATION')}
      </h2>

      <InviteComponent />
    </MainLayout>
  );
};

export default Invite;
