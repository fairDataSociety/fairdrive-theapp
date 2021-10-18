import HTTPClient from 'src/http';
import qs from 'querystring';

export async function getReceivePodInfo(payload: { podReference: string }) {
  try {
    const response = await HTTPClient().get('pod/receiveinfo', {
      params: qs.stringify({ reference: payload.podReference }, 'brackets'),
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
