import { by, element } from 'protractor';
import {HomePagePo} from './home.po';

export class ProfilePagePo {

    async clickLogout() {
        await element(by.id('logoutButton')).click();
        return new HomePagePo();
    }
}
