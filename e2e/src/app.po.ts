import { browser, by, element } from 'protractor';
import {InsertFormPo} from './insert-form.po';

export class AppPagePo {
  async navigateTo() {
    return await browser.get('/');
  }

  async getTitleText() {
    return await element(by.xpath('/html/body/app-root/app-reports-board/div/div[1]/app-reports-list/div/div[1]/h1')).getText();
  }

  async clickAddReport() {
      const button = element(by.xpath('/html/body/app-root/app-reports-board/div/div[2]/app-map/div/div/button'));
      await button.click();

      return new InsertFormPo();
  }
}
