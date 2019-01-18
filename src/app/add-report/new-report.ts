import dateUtils from '../utils/date-utils';

export class NewReport {
    public date: string;
    public time: string;

    constructor(
        public title: string,
        public description: string,
        public url: string,
        public address: string,
        public latitude: number,
        public longitude: number,
        public ts: Date,
        public _id: string
    ) {

        const {date, time} = dateUtils.timestampToItalianDate(this.ts.toISOString());
        this.date = date;
        this.time = time;

    }

}
