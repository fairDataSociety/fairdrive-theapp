import HTTPClient from 'src/http';

export async function deletePod(podName: string) {
  try {
    const response = await HTTPClient().delete('pod/delete', {
      data: { pod_name: podName },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
