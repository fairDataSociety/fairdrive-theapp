import HTTPClient from 'src/http';

export async function getPods() {
  try {
    const response = await HTTPClient().get('pod/ls');

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
