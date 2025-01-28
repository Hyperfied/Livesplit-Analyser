class TimeSpan{
    private _milliseconds: number;

    constructor(milliseconds: number){
        this._milliseconds = milliseconds;
    }

    get milliseconds(){
        return this._milliseconds;
    }

    get seconds(){
        return this._milliseconds / 1000;
    }

    get minutes(){
        return this.seconds / 60;
    }

    get hours(){
        return this.minutes / 60;
    }

    get days(){
        return this.hours / 24;
    }

    get weeks(){
        return this.days / 7;
    }

    get months(){
        return this.days / 30;
    }

    get years(){
        return this.days / 365;
    }

    addMilliseconds(milliseconds: number){
        return new TimeSpan(this._milliseconds + milliseconds);
    }

    addSeconds(seconds: number){
        return this.addMilliseconds(seconds * 1000);
    }

    addMinutes(minutes: number){
        return this.addSeconds(minutes * 60);
    }

    addHours(hours: number){
        return this.addMinutes(hours * 60);
    }

    addDays(days: number){
        return this.addHours(days * 24);
    }

    addWeeks(weeks: number){
        return this.addDays(weeks * 7);
    }

    addMonths(months: number){
        return this.addDays(months * 30);
    }

    addYears(years: number){
        return this.addDays(years * 365);
    }

    static parseString(timeSpanString: string): TimeSpan{
        const parts = timeSpanString.split(":");
        var timeSpan = new TimeSpan(0);

        if(parts.length > 0){
            timeSpan = timeSpan.addHours(parseInt(parts[0]));
            timeSpan = timeSpan.addMinutes(parseInt(parts[1]));
            const secondsParts = parts[2].split(".");
            timeSpan = timeSpan.addSeconds(parseInt(secondsParts[0]));
            if(secondsParts.length > 1){
                timeSpan = timeSpan.addMilliseconds(parseInt(secondsParts[1])/10000);
            }
        }

        return timeSpan;
    }
}

export default TimeSpan;