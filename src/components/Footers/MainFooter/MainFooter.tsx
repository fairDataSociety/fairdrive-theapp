import { FC, useContext } from 'react';
import Link from 'next/link';

import ThemeContext from '@context/ThemeContext';

import LinumLabsLightIcon from '@media/branding/linum-labs-logo-light.svg';
import LinumLabsDarkIcon from '@media/branding/linum-labs-logo-dark.svg';

import FairDataSocietyLightIcon from '@media/branding/fair-data-society-logo-light.svg';
import FairDataSocietyDarkIcon from '@media/branding/fair-data-society-logo-dark.svg';

import SwarmLightIcon from '@media/branding/swarm-logo-light.svg';
import SwarmDarkIcon from '@media/branding/swarm-logo-dark.svg';

import StarLightIcon from '@media/UI/star-light.svg';
import StarDarkIcon from '@media/UI/star-dark.svg';

import GithubLightIcon from '@media/branding/github-light.svg';
import GithubDarkIcon from '@media/branding/github-dark.svg';

import DiscordLightIcon from '@media/branding/discord-light.svg';
import DiscordDarkIcon from '@media/branding/discord-dark.svg';

import MediumLightIcon from '@media/branding/medium-light.svg';
import MediumDarkIcon from '@media/branding/medium-dark.svg';

const FooterImage: FC<{ src: string; alt: string; width?: string }> = ({
  src,
  alt,
  width,
}: {
  src: string;
  alt: string;
  width?: string;
}) => {
  return <img src={src} alt={alt} style={{ width, display: 'inline-block' }} />;
};

const MainFooter: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="hidden md:flex justify-between items-center w-full h-32 px-8 bg-white shadow-top">
      <div className="flex flex-wrap justify-evenly items-center">
        <a
          className="mr-4 mb-2"
          href="https://linumlabs.com/"
          target="_blank"
          rel="noreferrer"
        >
          {theme === 'light' ? (
            <LinumLabsLightIcon className="inline-block" />
          ) : (
            <LinumLabsDarkIcon className="inline-block" />
          )}
        </a>

        <a
          className="mr-4 mb-2"
          href="https://fairdatasociety.org/"
          target="_blank"
          rel="noreferrer"
        >
          {theme === 'light' ? (
            <FairDataSocietyLightIcon className="inline-block" />
          ) : (
            <FairDataSocietyDarkIcon className="inline-block" />
          )}
        </a>

        <a
          className="mr-4 mb-2"
          href="https://www.ethswarm.org/"
          target="_blank"
          rel="noreferrer"
        >
          {theme === 'light' ? (
            <SwarmLightIcon className="inline-block" />
          ) : (
            <SwarmDarkIcon className="inline-block" />
          )}
        </a>
      </div>

      <div className="flex justify-center items-center space-x-16">
        <div className="flex justify-center items-center space-x-4">
          <p className="font-normal text-xs text-color-accents-purple-heavy dark:text-color-shade-light-1-night">
            © {new Date().getFullYear()} Fairdrive. All rights reserved
          </p>

          {theme === 'light' ? (
            <StarLightIcon className="inline-block" />
          ) : (
            <StarDarkIcon className="inline-block" />
          )}

          <Link href="/terms">
            <a className="font-normal text-xs text-color-accents-purple-heavy dark:text-color-shade-light-1-night leading-6">
              Terms & Conditions
            </a>
          </Link>

          {theme === 'light' ? (
            <StarLightIcon className="inline-block" />
          ) : (
            <StarDarkIcon className="inline-block" />
          )}

          <Link href="/privacy-policy">
            <a className="font-normal text-xs text-color-accents-purple-heavy dark:text-color-shade-light-1-night leading-6">
              Privacy Policy
            </a>
          </Link>
        </div>
        <div className="space-y-3">
          <div className="space-x-6">
            <a
              href="https://github.com/fairDataSociety/fairdrive-theapp"
              target="_blank"
              rel="noreferrer"
            >
              {theme === 'light' ? (
                <GithubLightIcon className="inline-block" />
              ) : (
                <GithubDarkIcon className="inline-block" />
              )}
            </a>

            <a
              href="https://discord.gg/RpX5eU4Cpr"
              target="_blank"
              rel="noreferrer"
            >
              {theme === 'light' ? (
                <DiscordLightIcon className="inline-block" />
              ) : (
                <DiscordDarkIcon className="inline-block" />
              )}
            </a>

            <a
              href="https://fairdatasociety.bzz.link/"
              target="_blank"
              rel="noreferrer"
            >
              {theme === 'light' ? (
                <MediumLightIcon className="inline-block" />
              ) : (
                <MediumDarkIcon className="inline-block" />
              )}
            </a>
          </div>
          <div className="flex space-x-2">
            <a
              href="https://www.mydata.org/participate/awards/"
              target="_blank"
              rel="noreferrer"
            >
              <FooterImage
                width="80px"
                src="/media/general/mydata-operator-2021.png"
                alt="MyData Operator 2021"
              />
            </a>

            <a
              href="https://www.mydata.org/participate/awards/"
              target="_blank"
              rel="noreferrer"
            >
              <FooterImage
                width="80px"
                src="/media/general/mydata-operator-2022.png"
                alt="MyData Operator 2022"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
