import HTTPClient from 'src/http';

export interface GetAvailablePods {
  pod_name: string[];
  shared_pod_name: string[];
}

export async function getPods() {
  try {
    const response = await HTTPClient().get<GetAvailablePods>('pod/ls');

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
