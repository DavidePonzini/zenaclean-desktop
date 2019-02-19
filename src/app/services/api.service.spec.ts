import {FixtureApiService, fixtureMarkers} from './fixture.api.service';

describe('ApiService', () => {

    it('should have correct markers', async () => {
        let markers = null
        await FixtureApiService.getReports(1, 2, 3, 4).subscribe(reports => {
            markers = reports;
            expect(markers).toEqual(reports);
        });
    });
});
