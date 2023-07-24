import { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DialogTransition, {
  DialogBackgroundTransition,
} from './DialogTransition';
import CloseLight from '@media/UI/close-light.svg';
import CloseDark from '@media/UI/close-light.svg';
import ThemeContext from '@context/ThemeContext';
import { Button } from '@components/Buttons';

interface DialogWrapperProps {
  children: React.ReactElement;
  open: boolean;
  onClose: (clickOutside?: boolean) => void;
}

export default function DialogWrapper({
  children,
  open,
  onClose,
}: DialogWrapperProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onClose(true)}>
        <DialogBackgroundTransition>
          <div className="fixed inset-0 bg-black opacity-75 bg-color-shade-black-night" />
        </DialogBackgroundTransition>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogTransition>
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-color-shade-white-day dark:text-color-shade-white-night bg-color-shade-dark-3-day dark:bg-color-shade-dark-3-night p-6 text-left align-middle shadow-xl transition-all">
                <Button
                  onClick={() => onClose(false)}
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
              </Dialog.Panel>
            </DialogTransition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
