import {HomePagePo} from './PageObjects/Home.po';
import {SignupFormPo} from './PageObjects/Signup-form.po';
import * as WebRequest from 'web-request';
import Config from '../../config.secret';
import {ReportMapPagePo} from './PageObjects/ReportMap.po';


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

    async function login(user) {
        await homePage.navigateTo();

        return await homePage.doCorrectLogin(user.email, user.password);
    }

    async function logout(mapPage: ReportMapPagePo) {
        const profile = await mapPage.clickProfileButton();

        return await profile.clickLogout();
    }

    async function postReport(map, title) {
        const add_report = await map.clickAddReportLogged();

        await add_report.writeTitle(title);
        await add_report.writeDescription('Test');
        const popup = await add_report.submitForm();

        return await popup.closePopup();
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
        const report = await map.openListElementByTitle(title);

        const confirm = await report.votePositive();
        const popupOk = await confirm.ConfirmVote();
        await popupOk.closePopup();

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();

        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
    });

    it('should not allow users to change their vote on the same report (vote=negative)', async () => {
        const title = 'test-vote-01';

        let map = await login(user1);
        await postReport(map, title);
        await logout(map);

        map = await login(user2);
        const report = await map.openListElementByTitle(title);

        const confirm = await report.voteNegative();
        const popupOk = await confirm.ConfirmVote();
        await popupOk.closePopup();

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
    });

    it('should not allow users to vote their own reports', async () => {
        const title = 'test-vote-1';

        const map = await login(user1);

        await postReport(map, title);

        const report = await map.openListElementByTitle(title);

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Non puoi votare le tue segnalazioni');
        await popup.closePopup();

        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Non puoi votare le tue segnalazioni');
        await popup.closePopup();
    });

    it('should not allow users to change their vote on the same report after logging in back again (vote=positive)', async () => {
        const title = 'test-vote-2';

        let map = await login(user1);
        await postReport(map, title);
        await logout(map);

        map = await login(user2);
        let report = await map.openListElementByTitle(title);

        const confirm = await report.votePositive();
        await confirm.ConfirmVote();

        await homePage.navigateTo();

        await login(user2);
        report = await map.openListElementByTitle(title);

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();

        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
    });

    it('should not allow users to change their vote on the same report after logging in back again(vote=negative)', async () => {
        const title = 'test-vote-21';

        let map = await login(user1);
        await postReport(map, title);
        await logout(map);

        map = await login(user2);
        let report = await map.openListElementByTitle(title);

        const confirm = await report.voteNegative();
        await confirm.ConfirmVote();

        await homePage.navigateTo();

        await login(user2);
        report = await map.openListElementByTitle(title);

        let popup = await report.votePositiveFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();

        popup = await report.voteNegativeFail();
        expect(popup.getMessageText()).toBe('Votazione già effettuata');
        await popup.closePopup();
    });
});
