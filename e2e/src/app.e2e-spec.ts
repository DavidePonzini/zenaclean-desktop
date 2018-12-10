import { AppPagePo } from './PageObjects/app.po';
import {browser, by, element} from 'protractor';

describe('workspace-project App', () => {
    let page: AppPagePo;

    function getRandomString() {
        let string = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 25; i++) {
            string += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return string;
    }

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

    it ('should appear particular existing report in list', async() => {
        await page.navigateTo();

        const reportTitle = await page.getTitleFirstListElement();
        const reportDescription = await page.getDescriptionFirstListElement();

        expect(await reportTitle).toEqual('Problema stradale');
        expect(await reportDescription).toEqual('In mezzo alla strada');
    });

    it ('should appear popup for single report view, when i click on list element', async() => {
        await page.navigateTo();

        const reportTitle = await page.getTitleFirstListElement();
        const reportDescription = await page.getDescriptionFirstListElement();

        const singleReportView = await page.openFirstListElement();

        const modalTitle = await singleReportView.getTitle();
        const modalDescr = await singleReportView.getDescription();

        expect(await reportTitle).toEqual(await modalTitle);
        expect(await reportDescription).toEqual(await modalDescr);
    });

    it ('should see a report in the list that i have just added', async() => {
        await page.navigateTo();

        const form = await page.clickAddReport();

        const randomTitle = getRandomString();
        const randomDescription = getRandomString();
        
        await form.writeTitle(randomTitle);
        await form.writeDescription(randomDescription);

        const popup = await form.clickConfirmButton();

        const closePopup = await popup.closePopup();

        await page.navigateTo();

        // check that string is present in list
        const reportTitle = await page.getMyReportTitle(randomTitle);
        const reportDescription = await page.getMyReportDescription(randomDescription);

        expect(await reportTitle).toEqual(randomTitle);
        expect(await reportDescription).toEqual(randomDescription);

    });
});
