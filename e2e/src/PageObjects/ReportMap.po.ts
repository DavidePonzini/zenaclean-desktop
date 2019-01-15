import { browser, by, element } from 'protractor';
import {InsertFormPo} from './Insert-form.po';
import {SingleReportViewPo} from './SingleReportView.po';
import {HomePagePo} from './Home.po';
import {PopupPo} from './Popup.po';
import {ProfilePagePo} from './ProfilePage.po';

export class ReportMapPagePo {

    async navigateTo() {
        await browser.get('/');
        return await element(by.id('demoButton')).click();
    }

    async clickAddReportNotLogged() {
        const button = element(by.id('temp_report_button'));
        await button.click();
        return new PopupPo();
    }

    async clickAddReportLogged() {
        const button = element(by.id('temp_report_button'));
        await button.click();
        const confirmButton = element(by.id('add_report_button'));
        await confirmButton.click();
        return new InsertFormPo();
    }

    async openFirstListElement() {
        const report = await element.all(by.className('report_title')).get(0);
        await report.click();

        return new SingleReportViewPo();
    }

    async openListElementByTitle(title) {
        await element.all(by.cssContainingText('.report_title', title)).get(0).click();

        return new SingleReportViewPo();
    }

    async getTitleFirstListElement() {
        return await element.all(by.className('report_title')).get(0).getText();
    }

    async getDescriptionFirstListElement() {
        return await element.all(by.className('report_description')).get(0).getText();
    }

    async getTitleLastListElement() {
        return await element.all(by.className('report_title')).last().getText();
    }

    async getDescriptionLastListElement() {
        return await element.all(by.className('report_description')).last().getText();
    }

    async getMyReportTitle(expectedTitle) {
        return await element.all(by.cssContainingText('.report_title', expectedTitle)).get(0).getText();
    }

    async getMyReportDescription(expectedDescription) {
        return await element.all(by.cssContainingText('.report_description', expectedDescription)).get(0).getText();
    }

    async isMapPresent() {
        return await element(by.tagName('agm-map')).isPresent();
    }

    async isProfileButtonPresent() {
        return await element(by.id('profileButton')).isPresent();
    }

    async clickProfileButton() {
        await element(by.id('profileButton')).click();
        return new ProfilePagePo();
    }
}
