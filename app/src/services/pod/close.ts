import HTTPClient from 'src/http';

export async function closePod(payload: { password: string; podName: string }) {
  try {
    const { password, podName } = payload;

    const response = await HTTPClient().post('pod/close', {
      password: password,
      pod_name: podName,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
