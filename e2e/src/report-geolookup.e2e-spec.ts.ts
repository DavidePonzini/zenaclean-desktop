import {ReportMapPagePo} from './PageObjects/ReportMap.po';
import {by, element} from 'protractor';

describe('report geo-lookup tests', () => {
    let reportMap: ReportMapPagePo;

    const user = {
        email: 'test@test.test',
        password: 'testtest'
    };

    beforeEach(async () => {
        reportMap = new ReportMapPagePo();
        await reportMap.navigateTo();
    });

    it('should not display reports where I search for a place where there are none', async () => {
        await reportMap.searchForLocation('New York Avenue Northwest, Washington, DC, USA');

        const text = await element(by.id('scrollable')).getText();

        expect(text).toBe('Nessuna segnalazione trovata');
    });

    it('should display a report when I search for a place which contains it', async () => {
        await reportMap.searchForLocation('Belvedere Edoardo Firpo, 2, Genoa, Metropolitan City of Genoa, Italy');

        const text = await reportMap.getTitleLastListElement();

        expect(text).toBe('gatto per strada');
    });
});
