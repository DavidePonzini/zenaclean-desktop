import { browser, by, element } from 'protractor';

export class InsertFormPo {


    async writeTitle(title) {
        await element(by.id('form_title')).sendKeys(title);
    }

    async writeDescription(description) {
        await element(by.id('form_description')).sendKeys(description);
    }

    async uploadPitcure(picture) {
        // TODO
        return;
    }

    async isConfirmButtonEnabled() {
        const button = element(by.id('form_submit'));
        return await button.isEnabled();
    }
}
