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
    description: 'DRACULA_DESCRIPTION',
    association: 'md',
  },
  {
    name: 'FairPhoto',
    link: 'https://app.photo.fairdatasociety.org',
    tags: ['photo', 'album'],
    description: 'FAIRPHOTO_DESCRIPTION',
    association: 'jpeg,png',
  },
  {
    name: 'Consents',
    link: 'https://app.crviewer.fairdatasociety.org',
    tags: ['consents', 'viewer', 'data'],
    description: 'CONSENTS_DESCRIPTION',
    association: 'json',
  },
  {
    name: 'NFTGenerator',
    link: process.env.NEXT_PUBLIC_NFT_GENERATOR_URL,
    tags: ['NFT', 'mint', 'xDAI', 'file', 'generator'],
    description: 'NFT_GENERATOR_DESCRIPTION',
    association: 'jpeg,png',
  },
  {
    name: 'FDS Agenda',
    link: 'https://agenda.fairdatasociety.org/',
    tags: ['FDS', 'agenda', 'calendar', 'organizer', 'schedule'],
    description: 'FDS_AGENDA_DESCRIPTION',
    association: 'json',
  },
];

const dAppsTestnet: Array<Dapp> = [
  {
    name: 'Dracula',
    link: 'https://app.dracula.dev.fairdatasociety.org',
    tags: ['text', 'editor', 'markdown', 'document'],
    description: 'DRACULA_DESCRIPTION',
    association: 'md',
  },
  {
    name: 'FairPhoto',
    link: 'https://app.photo.dev.fairdatasociety.org',
    tags: ['photo', 'album'],
    description: 'FAIRPHOTO_DESCRIPTION',
    association: 'jpeg,png',
  },
  {
    name: 'Consents',
    link: 'https://app.crviewer.dev.fairdatasociety.org',
    tags: ['consents', 'viewer', 'data'],
    description: 'CONSENTS_DESCRIPTION',
    association: 'json',
  },
  {
    name: 'NFTGenerator',
    link: process.env.NEXT_PUBLIC_NFT_GENERATOR_URL,
    tags: ['NFT', 'mint', 'xDAI', 'file', 'generator'],
    description: 'NFT_GENERATOR_DESCRIPTION',
    association: 'jpeg,png',
  },
  {
    name: 'FDS Agenda',
    link: 'https://agenda.dev.fairdatasociety.org/',
    tags: ['FDS', 'agenda', 'xDAI', 'file', 'schedule'],
    description: 'FDS_AGENDA_DESCRIPTION',
    association: 'json',
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
