import { browser, by, element } from 'protractor';
import {PopupPo} from './Popup.po';

export class SignupFormPo {
    async navigateTo() {
        return await browser.get('/');
    }

    async writeSSN(SSNCode) {
        await element(by.id('ssn')).sendKeys(SSNCode);
    }

    async writeEmail( email ) {
        await element(by.id('email')).sendKeys(email);
    }

    async writePassword( password ) {
        await element(by.id('password')).sendKeys(password);
    }

    async writeConfirmPassword( password ) {
        await element(by.id('confirm')).sendKeys(password);
    }

    async acceptPrivacy() {
        const privacyCheckbox = element(by.id('privacy-checkbox'));
        await privacyCheckbox.click();
    }

    async compileSignupForm(SSNCode, email, password, confirmPassword) {
        await this.writeSSN(SSNCode);
        await this.writeEmail(email);
        await this.writePassword(password);
        await this.writeConfirmPassword(confirmPassword);
    }

    async clickOnSignup () {
        const signupButton = element(by.id('submitSignupButton'));
        await signupButton.click();

        return new PopupPo();
    }

    async getErrorConfirmationPassword () {
        return await element(by.id('pwdMatchingError')).getText();
    }

    async getErrorLengthPassword() {
        return await element(by.id('pwdLengthError')).getText();
    }

}
