import { SubItem } from '@data/subscription';
import { DirectoryItem, FdpStorage } from '@fairdatasociety/fdp-storage';
import { PodShareInfo } from '@fairdatasociety/fdp-storage/dist/pod/types';
import { isSharedPod } from '@utils/pod';

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

export async function getUsersSubItems(
  fdp: FdpStorage,
  address: string
): Promise<SubItem[]> {
  return fdp.dataHub.getAllSubItems(address);
}

export async function getSubscriptionPods(
  fdp: FdpStorage,
  subItems: SubItem[]
): Promise<PodShareInfo[]> {
  const subs: PodShareInfo[] = [];

  for (const subItem of subItems) {
    try {
      const sub = await fdp.personalStorage.openSubscribedPod(
        subItem.subHash,
        subItem.unlockKeyLocation
      );

      subs.push(sub);
    } catch (error) {
      console.warn(String(error));
    }
  }

  return subs;
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
  pod: string | PodShareInfo,
  directory: string
): Promise<DirectoryItem> {
  if (isSharedPod(pod)) {
    return fdp.directory.readFromShared(
      pod,
      getFdpPathByDirectory(directory),
      false
    );
  }
  return fdp.directory.read(pod, getFdpPathByDirectory(directory), false);
}
