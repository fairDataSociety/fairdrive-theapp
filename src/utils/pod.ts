import { PodShareInfo } from '@fairdatasociety/fdp-storage/dist/pod/types';

export function isSharedPod(pod: unknown): pod is PodShareInfo {
  const { podName, podAddress, userAddress, password } = (pod ||
    {}) as PodShareInfo;

  return (
    typeof podName === 'string' &&
    typeof podAddress === 'string' &&
    typeof userAddress === 'string' &&
    typeof password === 'string'
  );
}

export function getPodName(pod: string | PodShareInfo): string {
  return typeof pod === 'string' ? pod : (pod as PodShareInfo).podName;
}
