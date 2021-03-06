import axios from '@api/customAxios';

interface CreateAccountData {
  user_name: string;
  password: string;
  mnemonic: string;
}

interface CreateAccountResponse {
  address: string;
}

interface LoginData {
  user_name: string;
  password: string;
}

interface LoginResponse {
  code: number;
  message: string;
}

export async function createAccount(
  data: CreateAccountData
): Promise<CreateAccountResponse> {
  return axios.post('user/signup', data);
}

export async function login(data: LoginData): Promise<LoginResponse> {
  return axios.post('user/login', data);
}

export async function logout(): Promise<LoginResponse> {
  return axios.post('user/logout');
}

export const userStats = async () => {
  const response = await axios.get('user/stat');
  return response;
};
