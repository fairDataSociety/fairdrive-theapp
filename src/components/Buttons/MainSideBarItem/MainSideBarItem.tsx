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
  onClick?: () => void;
  className?: string;
}

const DRIVE_PATH = '/drive';

const MainSideBarItem: FC<MainSideBarItemProps> = ({
  icons,
  label,
  link,
  driveSideBarToggle,
  onClick,
  className,
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
    if (router.pathname === DRIVE_PATH) {
      driveSideBarToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link href={link}>
      <div
        className={`${
          isActive
            ? 'border-r-0 border-b-4 sm:border-r-4 sm:border-b-0 border-color-accents-purple-heavy'
            : ''
        }  w-24 sm:w-full py-1 md:py-4 flex-shrink-0 shadow cursor-pointer hover:bg-color-shade-dark-4-day dark:hover:bg-color-shade-dark-2-night ${className}`}
        onClick={() => {
          if (router.pathname === DRIVE_PATH && link === DRIVE_PATH) {
            setTimeout(() => driveSideBarToggle(), 100);
          }
          onClick && onClick();
        }}
      >
        <a className="flex flex-col justify-center items-center m-auto">
          {theme === 'light'
            ? isActive
              ? icons.light.active
              : icons.light.inactive
            : isActive
            ? icons.dark.active
            : icons.dark.inactive}

          <span
            className={`inline-block mt-2 select-none ${
              isActive
                ? 'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar'
                : 'text-color-accents-plum-black dark:text-color-shade-light-2-night'
            }`}
          >
            {label}
          </span>
        </a>
      </div>
    </Link>
  );
};

export default MainSideBarItem;
