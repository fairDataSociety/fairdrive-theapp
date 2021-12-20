import axios from '@api/customAxios';
export interface GetPodResponse {
  pod_name: string[];
  shared_pod_name: string[];
}
export async function getPods(): Promise<GetPodResponse> {
  return (await axios.get('pod/ls')).data;
}

export async function openPod(podName: string): Promise<void> {
  await axios.post('pod/open', { podName });
}
