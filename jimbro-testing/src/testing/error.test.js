import { test, expect } from '@playwright/experimental-ct-react';

test("teste om knappen på siden sender seg til login siden" , async ({page}) => {
    await page.goto("http://localhost:3000/error");
    await page.click(".oldLink");
    await expect(page).toHaveURL("http://localhost:3000");
    //tester om knappen sender brukeren til login siden
});