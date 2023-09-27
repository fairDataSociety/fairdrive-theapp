import {
  Disclosure as DisclosureComponent,
  Transition,
} from '@headlessui/react';

import ArrowRightLight from '@media/UI/arrow-right-light.svg';
import ArrowRightDark from '@media/UI/arrow-right-dark.svg';
import React, { Fragment, useContext } from 'react';
import ThemeContext from '@context/ThemeContext';

import classes from './Disclosure.module.scss';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  buttonClassName?: string;
  conentClassName?: string;
}

export default function Disclosure({
  title,
  children,
  defaultOpen,
  buttonClassName,
  conentClassName,
}: DisclosureProps) {
  const { theme } = useContext(ThemeContext);

  const getArrowClasses = (open: boolean) =>
    `absolute right-4 top-5 ${classes.arrow} ${open ? classes.arrowOpen : ''}`;

  return (
    <DisclosureComponent defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <DisclosureComponent.Button
            className={`flex relative w-full justify-between py-2 text-left text-sm font-medium bg-color-shade-white-night dark:bg-color-shade-dark-1-night text-color-accents-purple-black dark:text-color-accents-grey-lavendar text-base py-3 px-8 dark:text-color-shade-light-2-night bg-none text-color-shade-light-3-night rounded ${buttonClassName}`}
          >
            <span>{title}</span>
            {theme === 'light' ? (
              <ArrowRightLight className={getArrowClasses(open)} />
            ) : (
              <ArrowRightDark className={getArrowClasses(open)} />
            )}
          </DisclosureComponent.Button>
          <div className="overflow-hidden">
            <Transition
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <DisclosureComponent.Panel
                className={`px-4 pt-4 pb-2 text-sm text-gray-500 ${conentClassName}`}
              >
                {children}
              </DisclosureComponent.Panel>
            </Transition>
          </div>
        </>
      )}
    </DisclosureComponent>
  );
}
