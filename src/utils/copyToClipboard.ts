export default function copyToClipboard(text: string): Promise<void> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      await navigator.clipboard.writeText(text);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
