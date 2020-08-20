export class EventModel{
    campaignName:string;
    eventType:string;
    appUserId:string;
    appUserGender:string;
    eventDate:Date;
    appDeviceType:string;
}

export class DateGroup{
    start:Date;
    end:Date;
}

export class Result{
    data:EventModel[];
    charts:Chart[];
}

export class Chart{
    name:string;
    names:string[];
    values:number[];
}