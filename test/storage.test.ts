import { Page } from 'puppeteer';
import { APP_URL } from './config/constants';
import {
  dataTestId,
  getElementById,
  getElementByTestId,
  openPage,
} from './utils/page';
import { generateRandomString } from './utils/random';
import { createAccount } from './utils/account';

describe('Successful registration tests', () => {
  let page: Page;
  const username = generateRandomString(8);
  const password = 'passwordpassword';

  beforeAll(async () => {
    page = await openPage(APP_URL);
    await createAccount(
      username,
      password,
      // TODO should be a variable
      'd277f3945bdb7feb69b707fd0db0481cdbfdf289b6cdc55ff63565ea4b52da2f'
    );
  });

  afterAll(async () => {
    await page.close();
  });

  test('Should successfully log in', async () => {
    const usernameInput = await getElementById(page, 'user_name');

    await usernameInput.click();
    await usernameInput.type(username);

    const passwordInput = await getElementById(page, 'password');

    await passwordInput.click();
    await passwordInput.type(password);
    await (await getElementByTestId(page, 'submit')).click();

    expect(await page.waitForSelector(dataTestId('sidebar'))).toBeTruthy();
  });
});
