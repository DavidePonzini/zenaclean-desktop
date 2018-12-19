import { browser, by, element } from 'protractor';
import {ReportMapPagePo} from './reportMap.po';

export class HomePagePo {

    async navigateTo() {
        return await browser.get('/');
    }

    async goToDemo() {
        await element(by.id('demoButton')).click();
        return new ReportMapPagePo();
    }

}
