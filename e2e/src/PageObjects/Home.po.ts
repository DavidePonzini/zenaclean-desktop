import { browser, by, element } from 'protractor';
import {ReportMapPagePo} from './ReportMap.po';
import {PopupPo} from './Popup.po';

export class HomePagePo {

    async navigateTo() {
        return await browser.get('/');
    }

    async goToDemo() {
        await element(by.id('demoButton')).click();
        return new ReportMapPagePo();
    }

    async doCorrectLogin(userEmail, password) {
        await element(by.id('login-email')).sendKeys(userEmail);
        await element(by.id('login-password')).sendKeys(password);
        await element(by.id('login-button')).click();
        return new ReportMapPagePo();
    }

    async doWrongLogin(userEmail, password) {
        await element(by.id('login-email')).sendKeys(userEmail);
        await element(by.id('login-password')).sendKeys(password);
        await element(by.id('login-button')).click();
        return new PopupPo();
    }

    async isProfileButtonPresent() {
        return await element(by.id('profileButton')).isPresent();
    }

    async isLoginButtonPresent() {
        return await element(by.id('login-button')).isPresent();
    }
}
