import {by, element} from 'protractor';

export class PopupPo {
    async getMessageText() {
        return await element(by.id('popup-message')).getText();
    }

    async closePopup() {
        return await element(by.id('popup-close-button')).click();
    }
}