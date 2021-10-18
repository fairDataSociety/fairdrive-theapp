import HTTPClient from 'src/http';

export async function deleteUser(payload: { password: string }) {
  try {
    const response = await HTTPClient().delete('user/delete', {
      data: {
        password: payload.password,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
