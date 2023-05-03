import { test, expect } from '@playwright/experimental-ct-react';

const dayCheck = "monday";

test("get day from backend" , async ({request}) => {
    const day = await request.get('/week/get/public/' + dayCheck);
    expect(day.ok()).toBeTruthy();
    const dayJson = await day.json();
    expect(dayJson[0].plan).toEqual("day1");
    //tester om den får tak i dagen fra backend og om den dataen den får er tilsvarende det som er satt her
});
