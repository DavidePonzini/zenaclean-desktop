import {HomePagePo} from './PageObjects/Home.po';
import {SignupFormPo} from './PageObjects/Signup-form.po';
import * as WebRequest from 'web-request';
import Config from '../../config.secret';
import {ReportMapPagePo} from './PageObjects/ReportMap.po';
import {browser} from 'protractor';
import {ProfilePagePo} from './PageObjects/ProfilePage.po';

const path = require('path');

describe('profile tests', () => {
    let homePage: HomePagePo;

    const user1 = {
        email: 'test@test.test',
        password: 'testtest'
    };

    async function login(user) {
        await homePage.navigateTo();
        return await homePage.doCorrectLogin(user.email, user.password);
    }

    async function myExplicitWait() {
        await browser.waitForAngularEnabled(false);
        await browser.sleep(500);
    }

    beforeEach(() => {
        homePage = new HomePagePo();
    });


    afterEach(async () => {
        await WebRequest.get(Config.apiUrl + 'reports/cleanup');
        await WebRequest.get(Config.apiUrl + 'users/cleanup');
    });

    it('should display the profile page when clicking on the profile button', async () => {
        const mapPage = await login(user1);
        await myExplicitWait();
        const profilePage = await mapPage.clickProfileButton();
        expect(profilePage.checkLogoutIsPresent());
        await profilePage.clickLogout();
    });

    it('should display the correct balance for a user', async () => {
        const map = await login(user1);
        await myExplicitWait();
        const profile = await map.clickProfileButton();
        await myExplicitWait();
        const balance = await profile.getBalance();
        expect(balance).toEqual('0 palanche');
        await profile.clickLogout();
    });
});
