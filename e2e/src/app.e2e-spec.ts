import { AppPagePo } from './app.po';
import {browser} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPagePo;

  beforeEach(() => {
    page = new AppPagePo();
  });

  it('should check for button be disabled if title is missing', async () => {
      await page.navigateTo();

      const form = await page.clickAddReport();

      // TODO set location: via Dodecaneso 35

      await form.writeTitle('');
      await form.writeDescription('manca il titolo^');



      expect(await form.isConfirmButtonEnabled()).toBeFalsy();
  });

    it('should check for button be disabled if description is missing', async () => {
        await page.navigateTo();

        const form = await page.clickAddReport();

        // TODO set location: via Dodecaneso 35

        await form.writeTitle('Frigo');
        await form.writeDescription('');

        expect(await form.isConfirmButtonEnabled()).toBeFalsy();
    });
});
