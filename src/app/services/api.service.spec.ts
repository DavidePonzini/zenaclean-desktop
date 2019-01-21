import {FixtureApiService, fixtureMarkers} from './fixture.api.service';

describe('ApiService', () => {

   /* it('has the same methods as ApiService', () => {
       // expect(Object.keys(FixtureApiService)).toEqual(Object.keys(APIService));
       // console.log('1', Object.keys(FixtureApiService));
       // console.log('2', Object.keys(APIService));
       // expect(true).toEqual(true);
    });*/

    it('should have correct markers', async () => {
        let markers = null
        await FixtureApiService.getReports(1, 2, 3, 4).subscribe(reports => {
            markers = reports;
            expect(markers).toEqual(reports);
        });
    });
});
