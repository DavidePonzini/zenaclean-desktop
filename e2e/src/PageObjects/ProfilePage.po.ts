import { by, element } from 'protractor';
import {HomePagePo} from './Home.po';

export class ProfilePagePo {

    async clickLogout() {
        await element(by.id('logoutButton')).click();
        return new HomePagePo();
    }

    async checkLogoutIsPresent() {
        return await element(by.id('logoutButton')).isPresent();
    }

    async getBalance() {
        return await element(by.id('profile-user-balance')).getText();
    }
}
