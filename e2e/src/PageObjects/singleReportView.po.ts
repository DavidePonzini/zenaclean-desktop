import {by, element} from 'protractor';

export class SingleReportView {

    async getTitle() {
        return await element(by.id('modal_report_title')).getText();
    }

    async getDescription() {
        return await element(by.id('modal_report_description')).getText();
    }

}