import TimeSpan from "./TimeSpan";
import SegmentTime from "./SegmentTIme";
import Splits from "./Splits";

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

    public get formattedName(): string {
        let currentString = this.name
        if (currentString[0] == "-") currentString = currentString.slice(1)
        const splitString = currentString.split("}");
        if (splitString.length > 1) return splitString[1]
        return splitString[0]
    }

    public getSegmentTimeGraphData(useGameTime: boolean, splits: Splits) : any[] {

        const data: any[] = []
        let currentBestTime = new SegmentTime(NaN, new TimeSpan(9999999), new TimeSpan(9999999));

        for (let i = 0; i < this.segmentTimes.length; i++)
        {
            if (useGameTime)
            {
                if (currentBestTime.gameTime.totalMilliseconds > this.segmentTimes[i].gameTime.totalMilliseconds) {
                    if (this.segmentTimes[i].gameTime.totalMilliseconds == 0 || this.segmentTimes[i].runID < 0) continue;
                    currentBestTime = this.segmentTimes[i];
                    const attempt = splits.getAttempt(this.segmentTimes[i].runID);

                    if (attempt == undefined) continue;
                    data.push({
                        Date: attempt.started.getTime(),
                        Time: currentBestTime.gameTime.totalMilliseconds
                    })
                }
            }
            else {
                if (currentBestTime.realTime.totalMilliseconds > this.segmentTimes[i].realTime.totalMilliseconds) {
                    if (this.segmentTimes[i].realTime.totalMilliseconds == 0 || this.segmentTimes[i].runID < 0) continue;
                    currentBestTime = this.segmentTimes[i];
                    const attempt = splits.getAttempt(this.segmentTimes[i].runID);

                    if (attempt == undefined) continue;
                    data.push({
                        Date: attempt.started.getTime(),
                        Time: currentBestTime.realTime.totalMilliseconds
                    })
            }}

            console.log(currentBestTime)
        }
        
        data.push({
            Date: splits.latestRunDate.getTime(),
            Time: useGameTime ? this.bestSegmentGameTime.totalMilliseconds : this.bestSegmentRealTime.totalMilliseconds
        })

        return data
    }

    public getFirstSegmentTime(): SegmentTime | undefined {
        for (let segmentTime of this.segmentTimes) {
            if (segmentTime.realTime.totalMilliseconds > 10) {
                return segmentTime
            }
        }
        return undefined;
    }
}

export default Segment;