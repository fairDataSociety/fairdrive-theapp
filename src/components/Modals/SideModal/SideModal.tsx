import { FC, ReactNode, ReactChild, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import CloseLightIcon from '@media/UI/close-light.svg';
import CloseDarkIcon from '@media/UI/close-dark.svg';

interface SideModalProps {
  showModal: boolean;
  closeModal?: () => void;
  headerIcon?: {
    light: ReactNode;
    dark: ReactNode;
  };
  headerTitle: string;
  children: ReactChild | ReactChild[];
}

const SideModal: FC<SideModalProps> = ({
  showModal,
  closeModal,
  headerIcon,
  headerTitle,
  children,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-30" onClick={closeModal}>
          <div
            className="absolute w-98 h-screen top-0 right-0 py-10 px-10 bg-color-shade-dark-1-day dark:bg-color-shade-dark-3-night z-50 overflow-scroll no-scroll-bar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center">
                <span className="inline-block mr-3">
                  {headerIcon && theme === 'light'
                    ? headerIcon?.light
                    : headerIcon?.dark}
                </span>
                <span className="text-xl text-color-accents-purple-black dark:text-color-shade-light-1-night">
                  {headerTitle}
                </span>
              </div>

              <span className="cursor-pointer" onClick={closeModal}>
                {theme === 'light' ? (
                  <CloseLightIcon className="inline-block" />
                ) : (
                  <CloseDarkIcon className="inline-block" />
                )}
              </span>
            </div>

            {children}
          </div>

          <div className="inset-0 fixed z-40 bg-color-shade-dark-5-night opacity-50">
            {/* Faded Background */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SideModal;
