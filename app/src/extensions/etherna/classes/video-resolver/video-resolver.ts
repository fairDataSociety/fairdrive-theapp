import Axios, { AxiosInstance } from 'axios';
import { IndexVideo, IndexVideoComment, SwarmVideoRaw, Video } from './types';

export default class VideoResolver {
  indexApiPath: string;
  beeHost: string;
  private axios: AxiosInstance;

  constructor(indexApiPath: string, beeHost: string) {
    this.indexApiPath = indexApiPath;
    this.beeHost = beeHost;
    this.axios = Axios.create({
      baseURL: indexApiPath,
    });
  }

  async resolveVideoWithPath(path: string): Promise<Video | null> {
    const normalizedPath = encodeURIComponent(path.replace(/(^\/?|\/?$)/g, ''));
    const indexVideo = await this.fetchVideo(normalizedPath);

    if (!indexVideo) return null;

    const comments = await this.fetchComments(normalizedPath);
    const meta = await this.fetchVideoMeta(indexVideo.manifestHash);

    return {
      ...indexVideo,
      comments,
      meta,
    };
  }

  private async fetchVideo(path: string) {
    try {
      const { data: video } = await this.axios.get<IndexVideo>(
        `videos/fdrive/${path}`
      );
      return video;
    } catch (error) {
      return null;
    }
  }

  private async fetchComments(path: string) {
    try {
      const { data: comments } = await this.axios.get<IndexVideoComment[]>(
        `videos/fdrive/${path}/comments`
      );
      return comments;
    } catch (error) {
      return [];
    }
  }

  private async fetchVideoMeta(reference: string) {
    try {
      const { data: meta } = await this.axios.get<SwarmVideoRaw>(
        `files/${reference}`,
        {
          baseURL: this.beeHost,
        }
      );
      return meta;
    } catch (error) {
      return null;
    }
  }
}
