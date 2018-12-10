import { browser, by, element } from 'protractor';
import {InsertFormPo} from './insert-form.po';

export class AppPagePo {

  async navigateTo() {
    return await browser.get('/');
  }

  async clickAddReport() {
      const button = element(by.xpath('/html/body/app-root/app-reports-board/div/div[2]/app-map/div/div/button'));
      await button.click();

      return new InsertFormPo();
  }
}
