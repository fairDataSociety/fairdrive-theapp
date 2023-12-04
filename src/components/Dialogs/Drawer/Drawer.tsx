import { Button } from '@components/Buttons';
import ThemeContext from '@context/ThemeContext';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';

import CloseLight from '@media/UI/close-light.svg';
import CloseDark from '@media/UI/close-light.svg';

type DrawerProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
};

export default function Drawer({
  children,
  open,
  onClose,
  className,
}: DrawerProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        unmount={false}
        open={open}
        onClose={onClose}
        className="fixed z-30 inset-0 overflow-y-auto"
      >
        <div className={`flex h-screen ${className}`}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="z-40 fixed inset-0 bg-black" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className={`z-50 relative flex flex-col justify-between bg-gray-500 w-full
                         max-w-sm p-6 overflow-hidden text-left align-middle
                         shadow-xl text-color-shade-white-day dark:text-color-shade-white-night
                         bg-color-shade-dark-3-day dark:bg-color-shade-dark-3-night p-6 text-left
                         align-middle shadow-xl transition-all`}
            >
              <Button
                onClick={onClose}
                variant="tertiary"
                className="absolute right-2 top-2 cursor-pointer"
                icon={
                  theme === 'light' ? (
                    <CloseLight className="inline-block" />
                  ) : (
                    <CloseDark className="inline-block" />
                  )
                }
              />
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
