import { HomePagePo } from './PageObjects/home.po';
import * as WebRequest from 'web-request';
const path = require('path');

describe('workspace-project App', () => {
    let homePage: HomePagePo;

    function getRandomString() {
        let string = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 25; i++) {
            string += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return string;
    }

    beforeEach(() => {
        homePage = new HomePagePo();
    });


    afterEach(async () => {
        const result = await WebRequest.get('http://webdev.dibris.unige.it:8080/reports/cleanup');
        // console.log(result.content);
    });

    it('should check for confirm popUp is not opened if title is missing', async () => {
        await homePage.navigateTo();
        const reportMapPage = await homePage.goToDemo();

        const form = await reportMapPage.clickAddReport();

        // TODO set location: via Dodecaneso 35

        await form.writeTitle('');
        await form.writeDescription('Test');
        await form.clickConfirmButton();

        expect(await form.isConfirmPopUpOpened()).toBeFalsy();
    });

    it('should check for confirm popUp is not opened if description is missing', async () => {
        await homePage.navigateTo();
        const reportMapPage = await homePage.goToDemo();

        const form = await reportMapPage.clickAddReport();
        // TODO set location: via Dodecaneso 35

        await form.writeTitle('Test');
        await form.writeDescription('');
        await form.clickConfirmButton();

        expect(await form.isConfirmPopUpOpened()).toBeFalsy();
    });

    it('should display a message when adding a new report', async () => {
        await homePage.navigateTo();
        const reportMapPage = await homePage.goToDemo();

        const form = await reportMapPage.clickAddReport();

        await form.writeTitle('Test');
        await form.writeDescription('Test');

        const popup = await form.submitForm();

        expect(await popup.getMessageText()).toEqual('Segnalazione aggiunta!');
    });

    it ('should appear particular existing report in list', async() => {
        await homePage.navigateTo();
        const reportMapPage = await homePage.goToDemo();

        const reportTitle = await reportMapPage.getTitleFirstListElement();
        const reportDescription = await reportMapPage.getDescriptionFirstListElement();

        expect(await reportTitle).toEqual('divano abbandonato');
        expect(await reportDescription).toEqual('fortunatamente e` molto comodo!');
    });

    it ('should appear popup for single report view, when i click on list element', async() => {
        await homePage.navigateTo();
        const reportMapPage = await homePage.goToDemo();

        const reportTitle = await reportMapPage.getTitleFirstListElement();
        const reportDescription = await reportMapPage.getDescriptionFirstListElement();

        const singleReportView = await reportMapPage.openFirstListElement();

        const modalTitle = await singleReportView.getTitle();
        const modalDescr = await singleReportView.getDescription();

        expect(await reportTitle).toEqual(await modalTitle);
        expect(await reportDescription).toEqual(await modalDescr);
    });

    it ('should see a report in the list that i have just added', async() => {
        await homePage.navigateTo();
        let reportMapPage = await homePage.goToDemo();

        const form = await reportMapPage.clickAddReport();

        const randomTitle = getRandomString();

        await form.writeTitle(randomTitle);
        await form.writeDescription('Test');

        const popup = await form.submitForm();

        await popup.closePopup();

        await homePage.navigateTo();
        reportMapPage = await homePage.goToDemo();

        // check that string is present in list
        const reportTitle = await reportMapPage.getMyReportTitle(randomTitle);
        const reportDescription = await reportMapPage.getMyReportDescription('Test');

        expect(await reportTitle).toEqual(randomTitle);
        expect(await reportDescription).toEqual('Test');

    });

    it('should display an error message when adding a url too big', async () => {
        await homePage.navigateTo();
        const reportMapPage = await homePage.goToDemo();

        const form = await reportMapPage.clickAddReport();

        await form.writeTitle('Test');
        await form.writeDescription('Test');
        const fileToUpload = '../imgTest/big_img.jpg',
            absolutePath = path.resolve(__dirname, fileToUpload);
        await form.uploadPitcure(absolutePath);

        const popup = form.getPopupError();

        expect(await popup.getMessageText()).toEqual('Immagine troppo grande.');
    });

    it('should display an error message when adding a file that is not a image', async () => {
        await homePage.navigateTo();
        const reportMapPage = await homePage.goToDemo();

        const form = await reportMapPage.clickAddReport();

        await form.writeTitle('Test');
        await form.writeDescription('Test');
        const fileToUpload = '../imgTest/not_a_image.txt',
            absolutePath = path.resolve(__dirname, fileToUpload);
        await form.uploadPitcure(absolutePath);

        const popup = form.getPopupError();

        expect(await popup.getMessageText()).toEqual('Formato immagine non corretto.');
    });
});
