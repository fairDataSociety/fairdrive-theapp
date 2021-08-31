import generateMnemonic from 'src/helpers/utils';

export async function generateSeedPhrase() {
  try {
    // TODO get seed phrase
    console.log('Creating seed phrase...');
    const res = await generateMnemonic();
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
