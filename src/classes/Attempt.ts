import TimeSpan from "./TimeSpan";

class Attempt {
    public id: number;
    public started: Date;
    public ended: Date;

    public realTime: TimeSpan;
    public gameTime: TimeSpan;
    public pauseTime: TimeSpan;

    constructor(id: number, started: Date, ended: Date, realTime: TimeSpan, gameTime: TimeSpan, pauseTime: TimeSpan) {
        this.id = id;
        this.started = started;
        this.ended = ended;
        this.realTime = realTime;
        this.gameTime = gameTime;
        this.pauseTime = pauseTime;
    }

    public static fromXML(xml: Element): Attempt {
        const id = parseInt(xml.getAttribute('id') || 'NaN');
        const started = new Date(xml.getAttribute('started') || 'Invalid Date');
        const ended = new Date(xml.getAttribute('ended') || 'Invalid Date');

        const realTimeElement = xml.getElementsByTagName('RealTime');
        let realTime = new TimeSpan(0);
        if (realTimeElement.length > 0) { realTime = TimeSpan.parseString(xml.getElementsByTagName('RealTime')[0].textContent || '00:00:00'); }
        
        const gameTimeElement = xml.getElementsByTagName('GameTime');
        let gameTime = new TimeSpan(0);
        if (gameTimeElement.length > 0) { gameTime = TimeSpan.parseString(xml.getElementsByTagName('GameTime')[0].textContent || '00:00:00'); }

        const pauseTimeElement = xml.getElementsByTagName('PauseTime');
        let pauseTime = new TimeSpan(0);
        if (pauseTimeElement.length > 0) { pauseTime = TimeSpan.parseString(xml.getElementsByTagName('PauseTime')[0].textContent || '00:00:00'); }

        return new Attempt(id, started, ended, realTime, gameTime, pauseTime);
    }

    public getAttemptDuration(): TimeSpan {
        const duration = this.ended.getTime() - this.started.getTime();
        return new TimeSpan(duration);
    }
}

export default Attempt;