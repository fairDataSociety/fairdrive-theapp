import puppeteer, { Browser } from 'puppeteer';

const setup = async () => {
  const browser: Browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container in github CI environment
    headless: false,
    args: [`--no-sandbox`],
  });
  // This global is not available inside tests but only in global teardown
  global.__BROWSER__ = browser;
};

export default setup;
