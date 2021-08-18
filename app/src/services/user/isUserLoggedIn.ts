import HTTPClient from 'src/http';
import qs from 'querystring';

export async function isUserLoggedIn(username: string) {
  try {
    const response = await HTTPClient().get('user/isloggedin', {
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
