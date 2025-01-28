import TimeSpan from "./TimeSpan";

class SegmentTime {
    public runID: number;

    public realTime: TimeSpan;
    public gameTime: TimeSpan;

    constructor(runID: number, realTime: TimeSpan, gameTime: TimeSpan) {
        this.runID = runID;
        this.realTime = realTime;
        this.gameTime = gameTime;
    }

    public static fromXML(xml: Element): SegmentTime {
        const runID = parseInt(xml.getAttribute('id') || 'NaN');

        const realTimeElement = xml.getElementsByTagName('RealTime');
        let realTime = new TimeSpan(0);
        if (realTimeElement.length > 0) { realTime = TimeSpan.parseString(xml.getElementsByTagName('RealTime')[0].textContent || '00:00:00'); }

        const gameTimeElement = xml.getElementsByTagName('GameTime');
        let gameTime = new TimeSpan(0);
        if (gameTimeElement.length > 0) { gameTime = TimeSpan.parseString(xml.getElementsByTagName('GameTime')[0].textContent || '00:00:00'); }

        return new SegmentTime(runID, realTime, gameTime)
    }
}

export default SegmentTime;