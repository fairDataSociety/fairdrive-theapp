import HTTPClient from 'src/http';

export async function sharePod(password: string, podName: string) {
  try {
    const response = await HTTPClient().post('pod/share', {
      pod_name: podName,
      password: password,
    });

    return response?.data?.pod_sharing_reference;
  } catch (error) {
    return Promise.reject(error);
  }
}
