import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import LinkLightIcon from '@media/UI/link-light.svg';
import LinkDarkIcon from '@media/UI/link-dark.svg';

interface ExploreCardProps {
  name: string;
  link: string;
  description: string;
  icon?: string;
}

const ExploreCard: FC<ExploreCardProps> = ({
  name,
  link,
  description,
  icon,
}) => {
  const { theme } = useContext(ThemeContext);
  const themeExtension = theme === 'light' ? 'Light' : '';

  const defaultIcon = (e: any) => {
    e.target.src =
      theme === 'light'
        ? '/media/dapps/DefaultLight.svg'
        : '/media/dapps/Default.svg';
  };

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className="w-auto">
        <div className="flex justify-center items-center w-full h-48 bg-color-shade-white-night dark:bg-color-shade-dark-2-night rounded">
          <img
            src={icon || `/media/dapps/${name + themeExtension}.svg`}
            alt={`${name} Icon`}
            onError={defaultIcon}
          />
        </div>

        <div className="flex justify-between items-center mt-3">
          <h4 className="text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar">
            {name}
          </h4>
          <span className="">
            {theme === 'light' ? (
              <LinkLightIcon className="inline-block" />
            ) : (
              <LinkDarkIcon className="inline-block" />
            )}
          </span>
        </div>
        <p className="mt-1 text-color-accents-plum-black dark:text-color-shade-light-2-night">
          {description}
        </p>
      </div>
    </a>
  );
};

export default ExploreCard;
