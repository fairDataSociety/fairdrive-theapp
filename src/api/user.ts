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

export async function importUser(
  data: ImportUserData
): Promise<ImportUserResponse> {
  return axios.post('user/import', data);
}

export async function exportUser(): Promise<ExportUserResponse> {
  return (await axios.post('user/export')).data;
}
