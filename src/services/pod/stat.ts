import HTTPClient from 'src/http';
import qs from 'querystring';

export async function getPodStats(payload: { podName: string }) {
  try {
    const response = await HTTPClient().get('pod/stat', {
      params: qs.stringify({ pod_name: payload.podName }, 'brackets'),
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
