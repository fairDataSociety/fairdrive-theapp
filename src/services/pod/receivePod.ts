import HTTPClient from 'src/http';

interface ReceivePayload {
  podReference: string;
  pod_name: string;
}

export async function receivePod(payload: ReceivePayload) {
  try {
    const response = await HTTPClient().get(
      `pod/receive?sharing_ref=${payload.podReference}&ref=${payload.podReference}`
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
