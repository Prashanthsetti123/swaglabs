import { test, expect } from '@playwright/test';
import { SwagLoginPage } from '../pages/SwagLoginPage';
import{validUser} from '../test-data/testData';//created test data
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import logger from '../utils/logger'; 

import { encrypt,decrypt } from '../utils/crypto-util';

test('valid login', async ({ page }) => {
  logger.info('Starting valid login test'); 
  const loginPage = new SwagLoginPage(page);
  const inventoryPage=new InventoryPage(page);
  const cartPage=new CartPage(page);
  const checkoutPage=new CheckoutPage(page);
  const checkoutCompletePage=new CheckoutCompletePage(page);

  logger.info('validating the data from env');
  if(!process.env.STANDARD_USER){
    logger.error('STANDARD_USER is not defined in the environment variables');
    throw new Error('STANDARD_USER is not defined in the environment variables');
  } 
  const username=  process.env.STANDARD_USER!;
  if(!process.env.STANDARD_PASS){
    logger.error('STANDARD_PASS is not defined in the environment variables');
    throw new Error('STANDARD_PASS is not defined in the environment variables');
  }
  //encrypt and decrypt the password
  const encryptPass=encrypt(process.env.STANDARD_PASS!); 
  //const password=decrypt(process.env.STANDARD_PASS!);
  //const password = decrypt(encryptPass);

  if(!process.env.FIRST_NAME) {
    logger.error('First name is not defined in the environment variables');
    throw new Error('First name is not defined in the environment variables');
  }         
  const firstname=process.env.FIRST_NAME!;
  if(!process.env.LAST_NAME) {
    logger.error('Last name is not defined in the environment variables');
    throw new Error('Last name is not defined in the environment variables');
  }
  const lastname=process.env.LAST_NAME!;

  if(!process.env.PINCODE) {
    logger.error('Pincode is not defined in the environment variables');
    throw new Error('Pincode is not defined in the environment variables');
  }
  const pincode=process.env.PINCODE!;

  logger.info('Navigating to login page and performing login');
  //logger.info('the encrypted value is: ' + encryptPass);
  logger.info('the decrypted value is: ' + password);
  await loginPage.gotoLoginPage();
  await loginPage.login(username, password);
  await expect(page).toHaveURL(/.*inventory/); 

  logger.info('Login successful, navigating to inventory page');
  await inventoryPage.addItemToCart();
  await inventoryPage.goToCart();

  logger.info('Item added to cart, proceeding to checkout');
  await cartPage.proceedToCheckout();

  logger.info('Filling in user details for checkout');
  await checkoutPage.fillUserDetails(firstname,lastname,pincode);
  await checkoutPage.finishCheckout();

  logger.info('Checkout completed, verifying order success');
  await checkoutCompletePage.verifyOrderSuccess();

});

