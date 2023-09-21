import { FC, useContext } from 'react';
import Link from 'next/link';

import ThemeContext from '@context/ThemeContext';

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

import BlogLightIcon from '@media/branding/blog-light.svg';
import BlogDarkIcon from '@media/branding/blog-dark.svg';
import { useLocales } from '@context/LocalesContext';

const MainFooter: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { intl } = useLocales();

  return (
    <div className="hidden md:flex justify-between items-center w-full h-32 px-8 bg-white shadow-top">
      <div className="flex items-center flex-wrap mr-4">
        <a
          href="https://fairdatasociety.org/"
          className="ml-4 my-1"
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
          href="https://www.ethswarm.org/"
          className="ml-4 my-2"
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
            © {new Date().getFullYear()}{' '}
            {intl.get('FAIRDRIVE_ALL_RIGHTS_RESERVED')}
          </p>

          {theme === 'light' ? (
            <StarLightIcon className="inline-block" />
          ) : (
            <StarDarkIcon className="inline-block" />
          )}

          <Link href="/terms">
            <a className="font-normal text-xs text-color-accents-purple-heavy dark:text-color-shade-light-1-night leading-6">
              {intl.get('TERMS_AND_CONDITIONS')}
            </a>
          </Link>

          {theme === 'light' ? (
            <StarLightIcon className="inline-block" />
          ) : (
            <StarDarkIcon className="inline-block" />
          )}

          <Link href="/privacy-policy">
            <a className="font-normal text-xs text-color-accents-purple-heavy dark:text-color-shade-light-1-night leading-6">
              {intl.get('PRIVACY_POLICY')}
            </a>
          </Link>
        </div>
        <div className="space-y-3">
          <div className="flex space-x-6">
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
              href="https://fairdatasociety.org/blog/"
              target="_blank"
              rel="noreferrer"
            >
              {theme === 'light' ? (
                <BlogLightIcon className="inline-block" />
              ) : (
                <BlogDarkIcon className="inline-block" />
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
