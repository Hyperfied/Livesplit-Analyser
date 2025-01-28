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

    public getSegmentTime(runID: number): SegmentTime | undefined {
        return this.segmentTimes.find((segmentTime) => segmentTime.runID === runID);
    }

    public getAverageSegmentTime(): SegmentTime {
        let realTime = new TimeSpan(0);
        let gameTime = new TimeSpan(0);
        for (let segmentTime of this.segmentTimes) {
            realTime = realTime.addMilliseconds(segmentTime.realTime.milliseconds);
            gameTime = gameTime.addMilliseconds(segmentTime.gameTime.milliseconds);
        }
        const realTimeSpan = new TimeSpan(realTime.milliseconds / this.segmentTimes.length);
        const gameTimeSpan = new TimeSpan(gameTime.milliseconds / this.segmentTimes.length);

        return new SegmentTime(0, realTimeSpan, gameTimeSpan);
    }
}

export default Segment;