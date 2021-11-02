import HTTPClient from 'src/http';
import qs from 'querystring';

export async function isUsernamePresent(username: string) {
  try {
    const response = await HTTPClient().get('user/present', {
      data: {
        user_name: username,
      },
      params: qs.stringify({ user_name: username }, 'brackets'),
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
