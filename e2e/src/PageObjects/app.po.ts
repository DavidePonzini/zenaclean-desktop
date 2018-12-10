import { browser, by, element } from 'protractor';
import {InsertFormPo} from './insert-form.po';
import {SingleReportView} from './singleReportView.po';

export class AppPagePo {

    async navigateTo() {
        return await browser.get('/');
    }

    async clickAddReport() {
        const button = element(by.id('add_report_button'));
        await button.click();

        return new InsertFormPo();
    }

    async openFirstListElement() {
        const report = await element.all(by.className('report_title')).get(0);
        await report.click();

        return new SingleReportView();
    }

    async getTitleFirstListElement() {
        const title = await element.all(by.className('report_title')).get(0).getText();
        return title;
    }

    async getDescriptionFirstListElement() {
        const descr = await element.all(by.className('report_description')).get(0).getText();
        return descr;
    }

    async getMyReportTitle(expectedTitle) {
        const title = await element.all(by.cssContainingText('.report_title', expectedTitle)).get(0).getText();
        return title;
    }

    async getMyReportDescription(expectedDescription) {
        const descr = await element.all(by.cssContainingText('.report_description', expectedDescription)).get(0).getText();
        return descr;
    }
}
