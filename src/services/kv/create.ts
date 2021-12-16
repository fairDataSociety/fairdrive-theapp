import HTTPClient from 'src/http';

export async function createTable(
  podName: string,
  tableName: string
): Promise<void> {
  try {
    await HTTPClient().post<Blob>('kv/new', {
      pod_name: podName,
      table_name: tableName,
    });
  } catch (error) {
    if (error?.status === 404 || error?.status === 500) {
      return;
    }
    throw error;
  }
}
