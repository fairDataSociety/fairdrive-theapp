import ethers from "ethers";

export default async function generateMnemonic() {
  let bytes = ethers.utils.randomBytes(16);
  let language = ethers.wordlists.en;
  let randomMnemonic = await ethers.utils.entropyToMnemonic(bytes, language);
  let mnemonic = randomMnemonic;
  return mnemonic;
}
