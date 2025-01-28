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
}

export default Attempt;