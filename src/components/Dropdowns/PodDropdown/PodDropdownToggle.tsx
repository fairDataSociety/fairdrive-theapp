import { useContext } from 'react';
import { Menu } from '@headlessui/react';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';
import { useLocales } from '@context/LocalesContext';
import { Button } from '@components/Buttons';

import PageDownLight from '@media/UI/page-down-light.svg';
import PageDownDark from '@media/UI/page-down-dark.svg';
import { getPodName, isSharedPod } from '@utils/pod';

const PodDropdownToggele = () => {
  const { theme } = useContext(ThemeContext);
  const { loading, activePod, setActivePod, setDirectoryName } =
    useContext(PodContext);
  const { intl } = useLocales();
  const podName = getPodName(activePod);

  const onBackToDrive = () => {
    setActivePod('');
    setDirectoryName('');
  };

  return (
    <>
      {podName && (
        <Button
          variant="tertiary"
          onClick={onBackToDrive}
          icon={
            theme === 'light' ? (
              <PageDownLight className="inline ml-2" />
            ) : (
              <PageDownDark className="inline ml-2" />
            )
          }
          className="m-auto sm:block md:hidden"
        />
      )}
      <Menu.Button
        disabled={loading}
        className={`flex items-center w-full cursor-pointer ${
          podName ? '' : 'pl-4'
        }`}
      >
        <span className="font-semibold text-lg cursor-pointer hover:bg-color-shade-dark-3-day text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar">
          {podName || intl.get('SELECT_A_POD')}

          {isSharedPod(activePod) && (
            <div className="text-xs">({intl.get('SUBSCRIBED')})</div>
          )}
        </span>
      </Menu.Button>
    </>
  );
};

export default PodDropdownToggele;
