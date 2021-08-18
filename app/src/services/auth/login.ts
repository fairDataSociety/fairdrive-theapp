import HTTPClient from 'src/http';

export async function loginUser(payload: {
  username: string;
  password: string;
}) {
  try {
    const { username, password } = payload;

    const response = await HTTPClient().post('user/login', {
      user_name: username,
      password: password,
    });

    localStorage.setItem('username', username);

    return { res: response };
  } catch (error) {
    return Promise.reject(error);
  }
}
