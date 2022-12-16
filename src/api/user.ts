import axios from '@api/customAxios';

interface ImportUserData {
  user_name: string;
  password: string;
  address?: string;
  mnemonic?: string;
}

interface ImportUserResponse {
  address: string;
}

interface ExportUserResponse {
  user_name: string;
  address: string;
}

export function login(userName: string, password: string): Promise<void> {
  return axios.post('v2/user/login', { userName, password });
}

export async function importUser(
  data: ImportUserData
): Promise<ImportUserResponse> {
  return axios.post('v1/user/import', data);
}

export async function exportUser(): Promise<ExportUserResponse> {
  return (await axios.post('v1/user/export')).data;
}
