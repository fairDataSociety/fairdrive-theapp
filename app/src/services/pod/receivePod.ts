import HTTPClient from 'src/http';

interface ReceivePayload {
  podReference: string;
  pod_name: string;
}

export async function receivePod(payload: ReceivePayload) {
  try {
    const response = await HTTPClient().get('pod/receive', {
      params: { reference: payload.podReference, pod_name: payload.pod_name },
      data: { reference: payload.podReference, pod_name: payload.pod_name },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
