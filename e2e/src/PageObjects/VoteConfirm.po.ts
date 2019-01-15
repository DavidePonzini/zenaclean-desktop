import {by, element} from 'protractor';
import {PopupPo} from './Popup.po';

export class VoteConfirmPo {
    async ConfirmVote() {
        await element(by.id('popup-yes-button')).click();

        return new PopupPo();
    }

    async DontConfirmVote() {
        return await element(by.id('popup-no-button')).click();
    }
}
