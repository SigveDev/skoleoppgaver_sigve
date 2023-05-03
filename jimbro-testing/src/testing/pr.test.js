import { test, expect } from '@playwright/experimental-ct-react';
import PrSite from '../pages/pr';

test.use({ viewport: { width: 390, height: 844 } });

test('should work', async ({ mount }) => {
  const component = await mount(<PrSite user={{displayName: "Ikke Sigve", id: "104714909816767530796"}}/>);
  await expect(component).toContainText("Ikke Sigve");
});