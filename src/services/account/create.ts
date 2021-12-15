import HTTPClient from 'src/http';
import { CreateAccount } from 'src/types/models/CreateAccount';
import { createPod } from 'src/services/pod';
import { CONSENTS_POD } from 'src/constants/constants';

export async function createAccount(payload: CreateAccount) {
  try {
    const response = await HTTPClient().post(
      'user/signup',
      JSON.stringify({
        user_name: payload.username,
        password: payload.password,
        mnemonic: payload.mnemonic,
      })
    );

    await createPod({ password: payload.password, podName: 'Home' });
    await createPod({ password: payload.password, podName: CONSENTS_POD });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
