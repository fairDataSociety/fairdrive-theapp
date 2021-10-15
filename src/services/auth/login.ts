import { AxiosResponse } from 'axios';
import HTTPClient from 'src/http';
interface RegularResponse {
  code: number;
  message: string;
}
export async function loginUser(payload: {
  username: string;
  password: string;
}): Promise<{ res: AxiosResponse<RegularResponse> }> {
  try {
    const { username, password } = payload;

    const response = await HTTPClient().post<RegularResponse>('user/login', {
      user_name: username,
      password: password,
    });

    localStorage.setItem('username', username);
    // TODO: Simplify below return to just response.data
    return { res: response };
  } catch (error) {
    return Promise.reject(error);
  }
}
