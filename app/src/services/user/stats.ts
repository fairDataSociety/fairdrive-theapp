import { AxiosResponse } from 'axios';
import HTTPClient from 'src/http';
import makeBlockie from 'ethereum-blockies-base64';
import { IUserStats } from 'src/types/models/UserStats';

export async function statsUser(): Promise<AxiosResponse<IUserStats>> {
  try {
    const response = await HTTPClient().get<IUserStats>('user/stat');

    const imageSrc = makeBlockie(response.data.reference);
    response.data.avatar = imageSrc;

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
