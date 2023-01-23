import { ParsedUrlQuery } from 'querystring';

export interface Dapp {
  name: string;
  link: string;
  tags: Array<string>;
  description: string;
  association: string;
}

const dAppsMainnet: Array<Dapp> = [
  {
    name: 'Dracula',
    link: 'https://app.dracula.fairdatasociety.org',
    tags: ['text', 'editor', 'markdown', 'document'],
    description:
      'Markdown editor dapp that can help you create perfect readme files or documentation.',
    association: 'md',
  },
  {
    name: 'FairPhoto',
    link: 'https://app.photo.fairdatasociety.org',
    tags: ['photo', 'album'],
    description: 'Photo album dapp.',
    association: 'jpeg,png',
  },
  {
    name: 'Consents',
    link: 'https://app.crviewer.fairdatasociety.org',
    tags: ['consents', 'viewer', 'data'],
    description:
      'Consent viewer, where you can check all data that you signed for sharing.',
    association: 'json',
  },
  {
    name: 'NFTGenerator',
    link: process.env.NEXT_PUBLIC_NFT_GENERATOR_URL,
    tags: ['NFT', 'mint', 'xDAI', 'file', 'generator'],
    description:
      'NFT Generator, allows you to select a file from Fairdrive to be minted into an NFT on xDAI.',
    association: 'jpeg,png',
  },
];

const dAppsTestnet: Array<Dapp> = [
  {
    name: 'Dracula',
    link: 'https://app.dracula.dev.fairdatasociety.org',
    tags: ['text', 'editor', 'markdown', 'document'],
    description:
      'Markdown editor dapp that can help you create perfect readme files or documentation.',
    association: 'md',
  },
  {
    name: 'FairPhoto',
    link: 'https://app.photo.dev.fairdatasociety.org',
    tags: ['photo', 'album'],
    description: 'Photo album dapp.',
    association: 'jpeg,png',
  },
  {
    name: 'Consents',
    link: 'https://app.crviewer.dev.fairdatasociety.org',
    tags: ['consents', 'viewer', 'data'],
    description:
      'Consent viewer, where you can check all data that you signed for sharing.',
    association: 'json',
  },
  {
    name: 'NFTGenerator',
    link: process.env.NEXT_PUBLIC_NFT_GENERATOR_URL,
    tags: ['NFT', 'mint', 'xDAI', 'file', 'generator'],
    description:
      'NFT Generator, allows you to select a file from Fairdrive to be minted into an NFT on xDAI.',
    association: 'jpeg,png',
  },
];

function selectDappRouter(routerQuery: string) {
  if (routerQuery && routerQuery.indexOf('.dev') === -1) {
    return dAppsMainnet;
  } else {
    return dAppsTestnet;
  }
}

export default selectDappRouter;
