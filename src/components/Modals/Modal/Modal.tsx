import { FC, ReactChild, ReactNode, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import CloseLight from '@media/UI/close-light.svg';
import CloseDark from '@media/UI/close-light.svg';

interface ModalProps {
  showModal: boolean;
  closeModal?: () => void;
  headerIcon?: {
    light: ReactNode;
    dark: ReactNode;
  };
  headerTitle: string;
  children: ReactChild | ReactChild[];
}

const Modal: FC<ModalProps> = ({
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
        <div
          className="fixed top-0 left-0 w-screen h-screen z-30 overflow-hidden"
          onClick={closeModal}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-color-shade-white-day opacity-50 z-40">
            {/* Background Overlay */}
          </div>

          <div className="absolute flex justify-center items-center w-full h-full z-50">
            <div onClick={(e) => e.stopPropagation()}>
              <div
                className={`flex flex-col w-100 h-auto p-6 text-color-accents-purple-black dark:text-color-shade-white-night bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow z-50 rounded`}
              >
                <div className="flex justify-between items-center mb-5 pb-4 border-b border-color-shade-light-3-day dark:border-color-shade-light-3-night">
                  <div className="flex justify-start items-center">
                    <span className="mr-3">
                      {headerIcon && theme === 'light'
                        ? headerIcon?.light
                        : headerIcon?.dark}
                    </span>
                    <h5 className="font-semibold text-xl">{headerTitle}</h5>
                  </div>

                  <span onClick={closeModal} className="cursor-pointer">
                    {theme === 'light' ? (
                      <CloseLight className="inline-block" />
                    ) : (
                      <CloseDark className="inline-block" />
                    )}
                  </span>
                </div>

                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
