import HTTPClient from 'src/http';
import makeBlockie from 'ethereum-blockies-base64';

export async function statsUser() {
  try {
    const response = await HTTPClient().get('user/stat');

    const imageSrc = makeBlockie(response.data.reference);
    response.data.avatar = imageSrc;

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
