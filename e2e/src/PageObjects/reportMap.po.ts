import { browser, by, element } from 'protractor';
import {InsertFormPo} from './insert-form.po';
import {SingleReportView} from './singleReportView.po';

export class ReportMapPagePo {

    async navigateTo() {
        await browser.get('/');
        return await element(by.id('demoButton')).click();
    }

    async clickAddReport() {
        const button = element(by.id('temp_report_button'));
        await button.click();
        const confirmButton = element(by.id('add_report_button'));
        await confirmButton.click();
        return new InsertFormPo();
    }

    async openFirstListElement() {
        const report = await element.all(by.className('report_title')).get(0);
        await report.click();

        return new SingleReportView();
    }

    async getTitleFirstListElement() {
        return await element.all(by.className('report_title')).get(0).getText();
    }

    async getDescriptionFirstListElement() {
        return await element.all(by.className('report_description')).get(0).getText();
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

    async isLogoutButtonPresent() {
        return await element(by.id('logoutButton')).isPresent();
    }
}
