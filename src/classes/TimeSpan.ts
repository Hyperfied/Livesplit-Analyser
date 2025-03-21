class TimeSpan{
    private _milliseconds: number;

    constructor(milliseconds: number){
        this._milliseconds = milliseconds;
    }

    get milliseconds() {
        return this._milliseconds % 1000;
    }

    get seconds(){
        return Math.floor(this._milliseconds / 1000) % 60;
    }

    get minutes(){
        return Math.floor(this._milliseconds / (1000 * 60)) % 60;
    }

    get hours(){
        return Math.floor(this._milliseconds / (1000 * 60 * 60)) % 24;
    }

    get days(){
        return Math.floor(this._milliseconds / (1000 * 60 * 60 * 24)) % 30;
    }

    get weeks(){
        return Math.floor(this._milliseconds / (1000 * 60 * 60 * 24 * 7)) % 52;
    }

    get months(){
        return Math.floor(this._milliseconds / (1000 * 60 * 60 * 24 * 30)) % 12;
    }

    get years(){
        return Math.floor(this._milliseconds / (1000 * 60 * 60 * 24 * 365));
    }

    get totalMilliseconds(){
        return this._milliseconds;
    }

    get totalSeconds(){
        return this._milliseconds / 1000;
    }

    get totalMinutes(){
        return Math.round(this.totalSeconds / 60);
    }

    get totalHours(){
        return Math.round(this.totalMinutes / 60);
    }

    get totalDays(){
        return Math.round(this.totalHours / 24);
    }

    get totalWeeks(){
        return Math.round(this.totalDays / 7);
    }

    get totalMonths(){
        return Math.round(this.totalDays / 30);
    }

    get totalYears(){
        return Math.round(this.totalDays / 365);
    }

    addMilliseconds(milliseconds: number){
        this._milliseconds += milliseconds;
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
            timeSpan.addHours(parseInt(parts[0]));
            timeSpan.addMinutes(parseInt(parts[1]));
            const secondsParts = parts[2].split(".");
            timeSpan.addSeconds(parseInt(secondsParts[0]));
            if(secondsParts.length > 1){
                timeSpan.addMilliseconds(Math.round(parseInt(secondsParts[1])/10000));
            }
        }

        return timeSpan;
    }

    toString(shortened: boolean, asWords: boolean): string {
        let hours = String(this.hours).padStart(asWords ? 0 : 2, '0');
        let minutes = String(this.minutes).padStart(asWords ? 0 : 2, '0');
        let seconds = String(this.seconds).padStart(asWords ? 0 : 2, '0');
        let milliseconds = String(this.milliseconds).padStart(asWords ? 0 : 3, '0');

        if (shortened) {
            if (this.days > 0) {
                if (asWords) { return `${this.days} days, ${hours} hours, ${minutes} minutes`; }
                return `${this.days}:${hours}:${minutes}`;
            }
            else if (this.hours > 0) {
                hours = String(this.hours);
                if (asWords) { return `${hours} hours, ${minutes} minutes`; }
                return `${hours}:${minutes}:${seconds}.${milliseconds}`;
            }
            else if (this.minutes > 0) {
                minutes = String(this.minutes)
                if (asWords) { return `${minutes} minutes, ${seconds} seconds`; }
                return `${minutes}:${seconds}.${milliseconds}`;
            } else {
                seconds = String(this.seconds)
                if (asWords) { return `${seconds}.${milliseconds} seconds`; }
                return `${seconds}.${milliseconds}`;
            }
        } else {
            hours = String(this.hours)
            return `${hours}:${minutes}:${seconds}:${milliseconds}`;
        }
    }

    subtract(other: TimeSpan) : TimeSpan
    {
        return new TimeSpan(this._milliseconds - other._milliseconds)
    }
}

export default TimeSpan;