import HTTPClient from 'src/http';

interface ImportUser {
  username: string;
  password: string;
  address: string;
}

export async function importUser(payload: ImportUser) {
  try {
    const response = await HTTPClient().post('user/import', {
      user_name: payload.username,
      password: payload.password,
      address: payload.address,
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
