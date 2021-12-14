import axios from '@api/customAxios';

interface RegisterData {
  user_name: string;
  password: string;
  mnemonic: string;
}

interface RegisterResponse {
  address: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  code: number;
  message: string;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  return axios.post('user/signup', data);
}

export async function login(data: LoginData): Promise<LoginResponse> {
  return axios.post('user/login', data);
}
