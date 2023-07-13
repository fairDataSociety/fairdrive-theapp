import { FC, useEffect, useState, useContext, ReactChild } from 'react';
import Link from 'next/link';
import router from 'next/router';

import ThemeContext from '@context/ThemeContext';

interface MainSideBarItemProps {
  icons: {
    light: {
      active: ReactChild;
      inactive: ReactChild;
    };
    dark: {
      active: ReactChild;
      inactive: ReactChild;
    };
  };
  label: string;
  link: string;
  driveSideBarToggle: any;
}

const MainSideBarItem: FC<MainSideBarItemProps> = ({
  icons,
  label,
  link,
  driveSideBarToggle,
}) => {
  const { theme } = useContext(ThemeContext);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (router.pathname === link) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [link]);

  useEffect(() => {
    if (router.pathname === '/drive') {
      driveSideBarToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${
        isActive ? 'border-r-4 border-color-accents-purple-heavy' : ''
      }  w-full py-1 md:py-4 shadow cursor-pointer hover:bg-color-shade-dark-4-day dark:hover:bg-color-shade-dark-2-night`}
      onClick={() => {
        if (router.pathname === '/drive') {
          setTimeout(() => driveSideBarToggle(), 100);
        }
      }}
    >
      <Link href={link}>
        <a className="flex flex-col justify-center items-center">
          {theme === 'light'
            ? isActive
              ? icons.light.active
              : icons.light.inactive
            : isActive
            ? icons.dark.active
            : icons.dark.inactive}

          <span
            className={`inline-block mt-2 ${
              isActive
                ? 'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar'
                : 'text-color-accents-plum-black dark:text-color-shade-light-2-night'
            }`}
          >
            {label}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default MainSideBarItem;
