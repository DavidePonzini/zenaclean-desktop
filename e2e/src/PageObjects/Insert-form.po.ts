import { by, element } from 'protractor';
import {PopupPo} from './Popup.po';

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


    async isConfirmPopUpOpened() {
        return await element(by.id('popup-yes-button')).isPresent();
    }

    async submitForm() {
        const button = element(by.id('form_submit'));
        await button.click();
        const confirm = element(by.id('popup-yes-button'));
        await confirm.click();

        return new PopupPo();
    }

    async clickConfirmButton() {
        const button = element(by.id('form_submit'));
        return await button.click();
    }

    async closeForm() {
        return await element(by.id('close-new-report-form')).click();
    }
}
