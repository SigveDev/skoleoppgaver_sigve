import { test, expect } from '@playwright/experimental-ct-react';

const userId = "104714909816767530796";
//dette er en testbruker sin id, dette er bare for å få faktisk data fra databasen

test("test get prs from backend" , async ({request}) => {
  const prs = await request.get('/pr/get/' + userId);
  expect(prs.ok()).toBeTruthy();
  const prsJson = await prs.json();
  expect(prsJson[0].bench).toEqual("100 kg");
  //sjekker om den får tak i prs fra backend og om den dataen den får er tilsvarende det som er satt her
});

test("render test page", async ({ page }) => {
  await page.goto("http://localhost:3000/pr");
  await expect(page).toHaveText("My PR's");
  //denne feiler siden den finner ikke elementet siden den ikke er logget inn og derfor ikke har tilgang til pr siden
});