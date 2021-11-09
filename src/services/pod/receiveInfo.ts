import HTTPClient from 'src/http';

export async function getReceivePodInfo(payload: { sharing_ref: string }) {
  try {
    const response = await HTTPClient().get(
      `pod/receiveinfo?sharing_ref=${payload.sharing_ref}&ref=name`
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
