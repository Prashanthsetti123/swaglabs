import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
 
  reporter: [['html'],['allure-playwright']], 
  timeout: 30 * 1000,
  expect: {
    timeout: 50000,
  },
  use: {
    
    baseURL: process.env.BASE_URL,
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
    headless: false, // Set to false if you want to see the browser during tests
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    
  ],


});
