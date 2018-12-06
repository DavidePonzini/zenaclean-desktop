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
      await form.writeDescription('e2e Test');



      expect(await form.isConfirmButtonEnabled()).toBeFalsy();
  });

    it('should check for button be disabled if description is missing', async () => {
        await page.navigateTo();

        const form = await page.clickAddReport();

        // TODO set location: via Dodecaneso 35

        await form.writeTitle('e2e Test');
        await form.writeDescription('');

        expect(await form.isConfirmButtonEnabled()).toBeFalsy();
    });

    it('should display a message when adding a new report', async () => {
       await page.navigateTo();

       const form = await page.clickAddReport();

       await form.writeTitle('2e2 Test');
       await form.writeDescription('e2e Test');

       const popup = await form.clickConfirmButton();

       expect(await popup.getMessageText()).toEqual('Segnalazione aggiunta!');
    });
});
