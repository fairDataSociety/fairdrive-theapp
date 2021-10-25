import { AxiosResponse } from 'axios';
import HTTPClient from 'src/http';
import { IUserStats } from 'src/types/models/UserStats';

export async function statsUser(): Promise<AxiosResponse<IUserStats>> {
  try {
    return await HTTPClient().get<IUserStats>('user/stat');
  } catch (error) {
    return Promise.reject(error);
  }
}
