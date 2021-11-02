import HTTPClient from 'src/http';

export async function exportUser() {
  try {
    const response = await HTTPClient().post('user/export');
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
