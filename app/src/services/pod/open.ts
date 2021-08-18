import HTTPClient from 'src/http';

const podNameDefault = 'Home';

export async function openPod(payload: { password: string; podName: string }) {
  try {
    const { password, podName } = payload;

    const response = await HTTPClient().post('pod/open', {
      pod_name:
        podName === undefined || podName === null ? podNameDefault : podName,
      password: password,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
