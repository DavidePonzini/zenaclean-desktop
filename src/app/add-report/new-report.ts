import dateUtils from '../utils/date-utils';

export class NewReport {
    public date: string;
    public time: string;

    constructor(public title: string,
                public description: string,
                public url: string,
                public address: string,
                public latitude: number,
                public longitude: number,
                public ts: Date
    ) {

        /*this.date = this.ts.getDate() + '/' + this.ts.getMonth() + '/' + this.ts.getFullYear();
        this.time = this.ts.getHours() + ':' + this.ts.getMinutes() + ':' + this.ts.getSeconds();*/
        const {date, time} = dateUtils.timestampToItalianDate(this.ts.toISOString());
        this.date = date;
        this.time = time;

    }

}
