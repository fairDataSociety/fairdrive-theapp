import HTTPClient from 'src/http';

export async function openTable(
  podName: string,
  tableName: string
): Promise<void> {
  await HTTPClient().post<void>('kv/open', {
    pod_name: podName,
    table_name: tableName,
  });
}
