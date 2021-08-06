import { SwarmImageRaw } from '../swarm-image/types';

export type IndexVideo = {
  creationDateTime: string;
  encryptionKey: string;
  encryptionType: IndexEncryptionType;
  manifestHash: string;
  ownerAddress: string;
  fairDrivePath?: string;
  ownerIdentityManifest: string;
  totDownvotes: number;
  totUpvotes: number;
};

export type IndexVideoComment = {
  creationDateTime: string;
  ownerAddress: string;
  ownerIdentityManifest?: string;
  text: string;
  videoManifestHash: string;
};

export type VoteValue = 'Up' | 'Down' | 'Neutral';

export type IndexEncryptionType = 'AES256' | 'Plain';

export type Video = IndexVideo & {
  comments: IndexVideoComment[];
  meta?: SwarmVideoRaw;
};

export type SwarmVideoRaw = {
  title: string;
  description: string;
  originalQuality: string;
  ownerAddress: string;
  duration: number;
  thumbnail?: SwarmImageRaw;
  sources: SwarmVideoSourceRaw[];
};

export type SwarmVideoSourceRaw = {
  quality: string;
  reference: string;
  referenceProtocol: ReferenceProtocol;
  size?: number;
  bitrate?: number;
  contentType?: string;
};

export type ReferenceProtocol = 'files' | 'bytes' | 'bzz' | 'fairos';
