import HTTPClient from 'src/http';

export async function syncPod() {
  try {
    const response = await HTTPClient().post('pod/sync');

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
