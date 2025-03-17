import TimeSpan from "./TimeSpan";
import SegmentTime from "./SegmentTIme";

class Segment {
 
    public name: string;

    public bestSegmentRealTime: TimeSpan;
    public bestSegmentGameTime: TimeSpan;

    public realTimeOnPB: TimeSpan;
    public gameTimeOnPB: TimeSpan;

    public segmentTimes: SegmentTime[];

    constructor(name: string, bestSegmentRealTime: TimeSpan, bestSegmentGameTime: TimeSpan, realTimeOnPB: TimeSpan, gameTimeOnPB: TimeSpan, segmentTimes: SegmentTime[]) {
        this.name = name;
        this.bestSegmentRealTime = bestSegmentRealTime;
        this.bestSegmentGameTime = bestSegmentGameTime;
        this.realTimeOnPB = realTimeOnPB;
        this.gameTimeOnPB = gameTimeOnPB;
        this.segmentTimes = segmentTimes;
    }

    public static fromXML(xml: Element): Segment {
        const name = xml.getElementsByTagName('Name')[0].textContent || 'Unknown Segment';

        const bestSegmentElement = xml.getElementsByTagName('BestSegmentTime');
        let bestSegmentRealTime = new TimeSpan(0);
        let bestSegmentGameTime = new TimeSpan(0);
        if (bestSegmentElement.length > 0) {
            if (bestSegmentElement[0].getElementsByTagName("RealTime").length > 0) { 
                bestSegmentRealTime = TimeSpan.parseString(bestSegmentElement[0].getElementsByTagName("RealTime")[0].textContent || '00:00:00');
            }

            if (bestSegmentElement[0].getElementsByTagName("GameTime").length > 0) {
                bestSegmentGameTime = TimeSpan.parseString(bestSegmentElement[0].getElementsByTagName("GameTime")[0].textContent || '00:00:00');
            }
        }

        const pbElement = xml.getElementsByTagName('SplitTimes')[0].getElementsByTagName("SplitTime");
        let realTimeOnPB = new TimeSpan(0);
        let gameTimeOnPB = new TimeSpan(0);
        if (pbElement.length > 0)
        {
            if (pbElement[0].getElementsByTagName("RealTime").length > 0) {
                realTimeOnPB = TimeSpan.parseString(pbElement[0].getElementsByTagName("RealTime")[0].textContent || '00:00:00');
            }

            if (pbElement[0].getElementsByTagName("GameTime").length > 0) {
                gameTimeOnPB = TimeSpan.parseString(pbElement[0].getElementsByTagName("GameTime")[0].textContent || '00:00:00');
            }
        }

        const segmentTimes: SegmentTime[] = [];
        const segmentTimesTag = xml.getElementsByTagName('SegmentHistory')[0];

        for (let j = 0; j < segmentTimesTag.children.length; j++) {
            const segmentTimeElement = segmentTimesTag.children[j];

            segmentTimes.push(SegmentTime.fromXML(segmentTimeElement));
        }

        return new Segment(name, bestSegmentRealTime, bestSegmentGameTime, realTimeOnPB, gameTimeOnPB, segmentTimes);
    }

    public getSegmentTime(runID: number): SegmentTime {
        const segmentTime = this.segmentTimes.find((segmentTime) => segmentTime.runID === runID);
        if (segmentTime == undefined) { 
            return new SegmentTime(NaN, new TimeSpan(0), new TimeSpan(0))
        }
        return segmentTime
    }

    public getAverageSegmentTime(): SegmentTime {
        let realTime = new TimeSpan(0);
        let gameTime = new TimeSpan(0);
        for (let segmentTime of this.segmentTimes) {
            realTime.addMilliseconds(segmentTime.realTime.totalMilliseconds);
            gameTime.addMilliseconds(segmentTime.gameTime.totalMilliseconds);
        }
        const realTimeSpan = new TimeSpan(Math.floor(realTime.totalMilliseconds / this.segmentTimes.length));
        const gameTimeSpan = new TimeSpan(Math.floor(gameTime.totalMilliseconds / this.segmentTimes.length));

        return new SegmentTime(NaN, realTimeSpan, gameTimeSpan);
    }

    public getName(): string {
        let currentString = this.name
        if (currentString[0] == "-") currentString = currentString.slice(1)
        const splitString = currentString.split("}");
        if (splitString.length > 1) return splitString[1]
        return splitString[0]
    }

    public getSegmentTimeGraphData(useGameTime: boolean) : any[] {

        const data: any[] = []
        let firstCompleted = false;

        for (let i = 0; i < this.segmentTimes.length; i++)
        {
            let Time = null;
            if (this.segmentTimes[i].realTime.totalMilliseconds > 10) {
                Time =  useGameTime ? this.segmentTimes[i].gameTime.totalMilliseconds : this.segmentTimes[i].realTime.totalMilliseconds;
                if (!firstCompleted) firstCompleted = true;
            }

            if (!firstCompleted) continue;
            data.push({
                RunId: this.segmentTimes[i].runID,
                Time: Time
            })
        }
        
        return data
    }
}

export default Segment;