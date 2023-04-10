import { DirectoryItem, FdpStorage } from '@fairdatasociety/fdp-storage';

export interface GetPodResponse {
  pod_name: string[];
  shared_pod_name: string[];
}

export interface PodFilesResponse {
  files: string[];
  dirs: string[];
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

export async function getFilesAndDirectories(
  fdp: FdpStorage,
  pod_name: string,
  directory: string
): Promise<DirectoryItem> {
  let data = { dir_path: '', pod_name: pod_name };

  if (directory === 'root') {
    data = {
      dir_path: '/',
      pod_name: pod_name,
    };
  } else {
    data = {
      dir_path: '/' + directory,
      pod_name: pod_name,
    };
  }

  return fdp.directory.read(data.pod_name, data.dir_path, false);
}
