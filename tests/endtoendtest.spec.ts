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

   //encrypt and decrypt the data
  const decryptPass=decrypt(process.env.STANDARD_PASS!); 
  const decryptUser=decrypt(process.env.STANDARD_USER!);
  const decryptFirstName=decrypt(process.env.FIRST_NAME!);
  const decryptLastName=decrypt(process.env.LAST_NAME!);
  const decryptPincode=decrypt(process.env.PINCODE!);

  logger.info('validating the data from env');
  if(!decryptUser){
    logger.error('STANDARD_USER is not defined in the environment variables');
    throw new Error('STANDARD_USER is not defined in the environment variables');
  } 
  if(!decryptPass){
    logger.error('STANDARD_PASS is not defined in the environment variables');
    throw new Error('STANDARD_PASS is not defined in the environment variables');
  }
 
  //const password=decrypt(process.env.STANDARD_PASS!);
  //const password = decrypt(encryptPass);

  if(!decryptFirstName) {
    logger.error('First name is not defined in the environment variables');
    throw new Error('First name is not defined in the environment variables');
  }         
 
  if(!decryptLastName) {
    logger.error('Last name is not defined in the environment variables');
    throw new Error('Last name is not defined in the environment variables');
  }

  if(!decryptPincode) {
    logger.error('Pincode is not defined in the environment variables');
    throw new Error('Pincode is not defined in the environment variables');
  }

  logger.info('Navigating to login page and performing login');
  logger.info('the encrypted value is: ' + decryptPass);
  logger.info('the encrypted username is: ' + decryptUser);

  await loginPage.gotoLoginPage();
  await loginPage.login(decryptUser, decryptPass);
  await expect(page).toHaveURL(/.*inventory/); 

  logger.info('Login successful, navigating to inventory page');
  await inventoryPage.addItemToCart();
  await inventoryPage.goToCart();

  logger.info('Item added to cart, proceeding to checkout');
  await cartPage.proceedToCheckout();

  logger.info('Filling in user details for checkout');
  await checkoutPage.fillUserDetails(decryptFirstName,decryptLastName,decryptPincode);
  await checkoutPage.finishCheckout();

  logger.info('Checkout completed, verifying order success');
  await checkoutCompletePage.verifyOrderSuccess();

});

