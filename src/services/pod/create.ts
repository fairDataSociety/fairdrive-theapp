import HTTPClient from 'src/http';

export async function createPod(payload: {
  password: string;
  podName: string;
}): Promise<boolean> {
  try {
    const { password, podName } = payload;

    await HTTPClient().post('pod/new', {
      password: password,
      pod_name: podName,
    });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}
