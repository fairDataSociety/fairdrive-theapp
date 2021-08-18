import HTTPClient from 'src/http';

export async function logoutUser() {
  try {
    const response = await HTTPClient().post('user/logout');
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
