import { browser, by, element } from 'protractor';
import {PopupPo} from './popup.po';

export class InsertFormPo {


    async writeTitle(title) {
        await element(by.id('form_title')).sendKeys(title);
    }

    async writeDescription(description) {
        await element(by.id('form_description')).sendKeys(description);
    }

    async uploadPitcure(picturePath) {
        await element(by.id('image_input')).sendKeys(picturePath);
    }

    getPopupError() {
        return new PopupPo();
    }

    async isConfirmButtonEnabled() {
        const button = element(by.id('form_submit'));
        return await button.isEnabled();
    }

    async clickConfirmButton() {
        const button = element(by.id('form_submit'));
        await button.click();

        return new PopupPo();
    }

    async closeForm() {
        return await element(by.id('close-new-report-form')).click();
    }
}