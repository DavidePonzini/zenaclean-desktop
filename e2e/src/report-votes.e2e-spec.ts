import {HomePagePo} from './PageObjects/Home.po';
import {SignupFormPo} from './PageObjects/Signup-form.po';
import * as WebRequest from 'web-request';
import Config from '../../config.secret';
import {ReportMapPagePo} from './PageObjects/ReportMap.po';
import {browser} from 'protractor';
import {log} from 'util';

describe('report voting tests', () => {
    let homePage: HomePagePo;
    let signupPage: SignupFormPo;

    const user1 = {
        email: 'report-votes@test.test',
        password: 'password'
    };

    const user2 = {
        email: 'report-votes-2@test.test',
        password: 'password'
    };

    const user3 = {
        email: 'report-votes-3@test.test',
        password: 'password'
    };

    const user4 = {
        email: 'report-votes-4@test.test',
        password: 'password'
    };

    const users = [user2, user3, user4];

    async function login(user) {
        await homePage.navigateTo();
        return await homePage.doCorrectLogin(user.email, user.password);
    }

    async function myExplicitWait() {
        await browser.waitForAngularEnabled(false);
        await browser.sleep(500);
    }

    async function logout(mapPage: ReportMapPagePo) {
        await myExplicitWait();

        const profile = await mapPage.clickProfileButton();
        await profile.clickLogout();

        await myExplicitWait();
    }

    async function postReport(map, title) {

        const add_report = await map.clickAddReportLogged();
        await add_report.writeTitle(title);
        await add_report.writeDescription('Test');
        const popup = await add_report.submitForm();

        await myExplicitWait();
        await popup.closePopup();
    }

    async function loginVoteLogout(user, title: string, positive: boolean) {
        const map = await login(user);
        await myExplicitWait();

        const report = await map.openListElementByTitle(title);
        const confirm = positive ? await report.votePositive() : await report.voteNegative();
        const popup = await confirm.ConfirmVote();
        await myExplicitWait();

        await popup.closePopup();
        await report.closePopup();

        await logout(map);
    }

    beforeEach(() => {
        homePage = new HomePagePo();
        signupPage = new SignupFormPo();
    });


    afterEach(async () => {
        await WebRequest.get(Config.apiUrl + 'reports/cleanup');
        await WebRequest.get(Config.apiUrl + 'users/cleanup');
    });

    it('should not allow users to change their vote on the same report (vote=positive)', async () => {
        const title = 'test-vote-0';

        let map = await login(user1);
        await postReport(map, title);
        await logout(map);

        map = await login(user2);
        await myExplicitWait();
        const report = await map.openListElementByTitle(title);

        const confirm = await report.votePositive();
        const popupOk = await confirm.ConfirmVote();
        await myExplicitWait();
        await popupOk.closePopup();

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();

        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
        await report.closePopup();

        await logout(map);
    });

    it('should not allow users to change their vote on the same report (vote=negative)', async () => {

        const title = 'test-vote-01';

        let map = await login(user1);
        await myExplicitWait();
        await postReport(map, title);
        await logout(map);

        map = await login(user2);
        await myExplicitWait();
        const report = await map.openListElementByTitle(title);

        const confirm = await report.voteNegative();
        const popupOk = await confirm.ConfirmVote();
        await myExplicitWait();
        await popupOk.closePopup();

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
        await report.closePopup();

        await logout(map);

    });

    it('should not allow users to vote their own reports', async () => {
        const title = 'test-vote-1';

        const map = await login(user1);
        await myExplicitWait();
        await postReport(map, title);

        await myExplicitWait();
        const report = await map.openListElementByTitle(title);

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Non puoi votare le tue segnalazioni');
        await myExplicitWait();
        await popup.closePopup();

        await myExplicitWait();
        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Non puoi votare le tue segnalazioni');
        await myExplicitWait();
        await popup.closePopup();
        await report.closePopup();
        await logout(map);
    });

    it('should not allow users to change their vote on the same report after logging in back again (vote=positive)', async () => {
        const title = 'test-vote-2';

        let map = await login(user1);
        await myExplicitWait();
        await postReport(map, title);
        await logout(map);

        map = await login(user2);
        await myExplicitWait();
        let report = await map.openListElementByTitle(title);

        const confirm = await report.votePositive();
        let popup = await confirm.ConfirmVote();
        await myExplicitWait();
        await popup.closePopup();
        await report.closePopup();
        await logout(map);

        await login(user2);
        await myExplicitWait();
        report = await map.openListElementByTitle(title);

        popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
        await report.closePopup();
        await logout(map);

    });

    it('should not allow users to change their vote on the same report after logging in back again(vote=negative)', async () => {
        const title = 'test-vote-21';

        let map = await login(user1);
        await myExplicitWait();
        await postReport(map, title);
        await logout(map);

        map = await login(user2);
        await myExplicitWait();
        let report = await map.openListElementByTitle(title);

        const confirm = await report.voteNegative();
        let popup = await confirm.ConfirmVote();
        await myExplicitWait();
        await popup.closePopup();
        await report.closePopup();
        await logout(map);

        await login(user2);
        await myExplicitWait();
        report = await map.openListElementByTitle(title);

        popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();

        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
        await report.closePopup();
        await logout(map);
    });

    it('should display status for approved reports (status=positive)', async () => {
        const title = 'test-vote-3';

        let map = await login(user1);
        await myExplicitWait();
        await postReport(map, title);
        await logout(map);

        await loginVoteLogout(user2, title, true);
        await loginVoteLogout(user3, title, true);
        await loginVoteLogout(user4, title, true);

        map = await login(user2);
        await myExplicitWait();
        const report = await map.openListElementByTitle(title);

        const status = await report.getStatusPositive();
        expect(status).toBeTruthy();

        await myExplicitWait();
        await report.closePopup();
        await logout(map);

    });

    it('should display status for approved reports (status=negative)', async () => {
        const title = 'test-vote-31';

        let map = await login(user1);
        await myExplicitWait();

        await postReport(map, title);
        await logout(map);

        await loginVoteLogout(user2, title, false);
        await loginVoteLogout(user3, title, false);
        await loginVoteLogout(user4, title, false);

        map = await login(user2);
        await myExplicitWait();
        const report = await map.openListElementByTitle(title);

        const status = await report.getStatusNegative();
        expect(status).toBeTruthy();
        await report.closePopup();
        await logout(map);
    });
});
