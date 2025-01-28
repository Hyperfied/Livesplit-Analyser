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
}

export default SegmentTime;