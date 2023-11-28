import { DirectoryItem, FdpStorage } from '@fairdatasociety/fdp-storage';

export interface GetPodResponse {
  pod_name: string[];
  shared_pod_name: string[];
}

export async function getPods(fdp: FdpStorage): Promise<GetPodResponse> {
  const list = await fdp.personalStorage.list();
  const { pods, sharedPods } = list;
  const response = {
    pod_name: pods.map((i) => i.name),
    shared_pod_name: sharedPods.map((i) => i.name),
  };

  return response as GetPodResponse;
}

export async function createPod(fdp: FdpStorage, pod_name: string) {
  return await fdp.personalStorage.create(pod_name);
}

export async function receivePod(fdp: FdpStorage, podReference: string) {
  return await fdp.personalStorage.getSharedInfo(podReference);
}

export function getFdpPathByDirectory(directory: string): string {
  if (directory === 'root') {
    return '/';
  }

  if (directory.startsWith('/')) {
    return directory;
  }

  return '/' + directory;
}

export async function getFilesAndDirectories(
  fdp: FdpStorage,
  podName: string,
  directory: string
): Promise<DirectoryItem> {
  return fdp.directory.read(podName, getFdpPathByDirectory(directory), false);
}
