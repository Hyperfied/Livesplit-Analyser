import TimeSpan from './TimeSpan';
import Attempt from './Attempt';
import Segment from './Segment';
import SegmentTime from './SegmentTIme';

class Splits {
 
    public gameName: string;
    public category: string;
    public platform: string;
    public usesEmulator: boolean;
    public region: string;
    public offset: TimeSpan

    public attempts: Attempt[];
    public segments: Segment[];

    public personalBest: SegmentTime;
    public personalBestId: number;

    public sumOfBest: SegmentTime;

    public totalTimePlayed: TimeSpan;

    public runsCompleted: number;
    public runsNotCompleted: number

    public firstRunDate: Date;
    public latestRunDate: Date;
    public pbRunDate: Date;

    public firstTime: TimeSpan;
    public firstCompletedRunDate: Date;

    constructor(gameName: string, category: string, platform: string, usesEmulator: boolean, region: string, offset: TimeSpan, attempts: Attempt[], segments: Segment[], 
        personalBest: SegmentTime, sumOfBest: SegmentTime, totalTimePlayed: TimeSpan, runsCompleted: number, runsNotCompleted: number, firstRunDate: Date, 
        latestRunDate: Date, pbRunDate: Date, firstTime: TimeSpan, personalBestId: number, firstCompletedRunDate: Date) {
        this.gameName = gameName;
        this.category = category;
        this.platform = platform;
        this.usesEmulator = usesEmulator;
        this.region = region;
        this.offset = offset;
        this.attempts = attempts;
        this.segments = segments;

        this.personalBest = personalBest;
        this.personalBestId = personalBestId

        this.sumOfBest = sumOfBest;

        this.totalTimePlayed = totalTimePlayed;

        this.runsCompleted = runsCompleted;
        this.runsNotCompleted = runsNotCompleted;

        this.firstRunDate = firstRunDate;
        this.latestRunDate = latestRunDate;
        this.pbRunDate = pbRunDate;

        this.firstTime = firstTime
        this.firstCompletedRunDate = firstCompletedRunDate;

    }

    public static fromXML (xml: Document): Splits {
        const gameName = xml.getElementsByTagName('GameName')[0].textContent || 'Unknown Game';
        const category = xml.getElementsByTagName('CategoryName')[0].textContent || 'Unknown Category';
        const offset = TimeSpan.parseString(xml.getElementsByTagName('Offset')[0].textContent || '00:00:00'); 

        const metadataTag = xml.getElementsByTagName('Metadata')[0];
        const platform = metadataTag.getElementsByTagName('Platform')[0].textContent || 'Unknown Platform';
        const region = metadataTag.getElementsByTagName('Region')[0].textContent || 'Unknown Region';
        const usesEmulator = metadataTag.getElementsByTagName('Platform')[0].getAttribute('usesEmulator') === 'True';

        const attempts: Attempt[] = [];
        const attemptsTag = xml.getElementsByTagName('AttemptHistory')[0];

        let personalBest = new SegmentTime(NaN, new TimeSpan(999999999999), new TimeSpan(999999999999));
        let personalBestId = -1

        let totalTimePlayed = new TimeSpan(0);

        let runsCompleted = 0;
        let runsNotCompleted = 0;

        let firstRunDate = new Date();
        let latestRunDate = new Date();
        let pbRunDate = new Date();

        let firstTime = new TimeSpan(0);
        let firstCompletedRunDate = new Date();

        firstRunDate = Attempt.fromXML(attemptsTag.children[0]).started;
        latestRunDate = Attempt.fromXML(attemptsTag.children[attemptsTag.children.length - 1]).started;

        for (let i = 0; i < attemptsTag.children.length; i++) {
            const attemptElement = attemptsTag.children[i];
            const attempt = Attempt.fromXML(attemptElement);

            if (attempt.gameTime.totalMilliseconds > 0) {
                if (firstTime.totalMilliseconds == 0) {
                    firstTime = attempt.gameTime;
                    firstCompletedRunDate = attempt.started;
                }

                if (attempt.gameTime.totalMilliseconds < personalBest.gameTime.totalMilliseconds) {
                    personalBest.gameTime = attempt.gameTime;
                    personalBest.realTime = attempt.realTime;
                    personalBestId = attempt.id;
                    pbRunDate = attempt.started;
                }
            }
            else if (attempt.realTime.totalMilliseconds > 0) {
                if (firstTime.totalMilliseconds == 0) {
                    firstTime = attempt.realTime;
                    firstCompletedRunDate = attempt.started;
                    console.log(firstCompletedRunDate);
                }

                if (attempt.realTime.totalMilliseconds < personalBest.realTime.totalMilliseconds) {
                    personalBest.gameTime = attempt.gameTime;
                    personalBest.realTime = attempt.realTime;
                    personalBestId = attempt.id;
                    pbRunDate = attempt.started;
                }
            }

            if (attempt.realTime.totalMilliseconds > 0 || attempt.gameTime.totalMilliseconds > 0) { runsCompleted++; }
            else { runsNotCompleted++; }

            const dateDelta = attempt.ended.getTime() - attempt.started.getTime();

            totalTimePlayed.addMilliseconds(dateDelta - attempt.pauseTime.totalMilliseconds);

            attempts.push(attempt);
        }

        let sumOfBestRealTime = new TimeSpan(0);
        let sumOfBestGameTime = new TimeSpan(0);

        const segments: Segment[] = [];
        const segmentsTag = xml.getElementsByTagName('Segments')[0];

        for (let i = 0; i < segmentsTag.children.length; i++) {
            const segmentElement = segmentsTag.children[i];

            const segment = Segment.fromXML(segmentElement);

            sumOfBestRealTime.addMilliseconds(segment.bestSegmentRealTime.totalMilliseconds);
            sumOfBestGameTime.addMilliseconds(segment.bestSegmentGameTime.totalMilliseconds);

            segments.push(segment);
        }

        let sumOfBest = new SegmentTime(NaN, sumOfBestRealTime, sumOfBestGameTime);

        return new Splits(gameName, category, platform, usesEmulator, region, offset, attempts, segments, personalBest, sumOfBest, totalTimePlayed, 
            runsCompleted, runsNotCompleted, firstRunDate, latestRunDate, pbRunDate, firstTime, personalBestId, firstCompletedRunDate);
    }

    public getAttempt(id: number): Attempt | undefined {
        return this.attempts.find((attempt) => attempt.id === id);
    }

    private getAttemptSegments(attempt: Attempt): SegmentTime[] {
        const segments: SegmentTime[] = [];

        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            const segmentTime = segment.getSegmentTime(attempt.id);

            if (segmentTime) {
                segments.push(segmentTime);
            }
            else {
                segments.push(new SegmentTime(NaN, new TimeSpan(0), new TimeSpan(0)));
            }
        }

        return segments;
    }

    public getGraphData(type: string, useGameTime: boolean): any[] {

        switch (type) {
            case 'pb':
                return this.getPersonalBestGraphData(useGameTime);
            case 'sob':
                return this.getSumOfBestGraphData(useGameTime);
            case 'playtime':
                return this.getPlaytimeGraphData();
            default:
                console.log("Got no Graph Data");
                return [];
        }
    }

    private getPersonalBestGraphData(useGameTime: boolean): any[] {
        const data: any[] = [];
        
        let currentPB = new TimeSpan(99999999999);

        for (let i = 0; i < this.attempts.length; i++) {
            const attempt = this.attempts[i];

            if (useGameTime) {
                if (attempt.gameTime.totalMilliseconds < currentPB.totalMilliseconds && attempt.gameTime.totalMilliseconds > 0) {
                    currentPB = attempt.gameTime;
                    
                    data.push({
                        Date: attempt.started.getTime(),
                        Time: currentPB.totalMilliseconds
                    });
                }
                // else {
                //     data.push({
                //         Date: attempt.started.getTime(),
                //         Time: null
                //     });
                // }
            }
            else {
                if (attempt.realTime.totalMilliseconds < currentPB.totalMilliseconds && attempt.realTime.totalMilliseconds > 0) {
                    currentPB = attempt.realTime;

                    data.push({
                        Date: attempt.started.getTime(),
                        Time: currentPB.totalMilliseconds
                    });
                }
                // else {
                //     data.push({
                //         Date: attempt.started.getTime(),
                //         Time: null
                //     });
                // }
            }
        }

        return data;
    }

    private getSumOfBestGraphData(useGameTime: boolean): any[] {

        const data: any[] = [];
        
        let bestSegments : SegmentTime[] = [];

        for (let i = 0; i < this.attempts.length; i++) {
            const attempt = this.attempts[i];
            const attemptSegments = this.getAttemptSegments(attempt);

            for (let j = 0; j < attemptSegments.length; j++) {
                if (useGameTime) {
                    if (bestSegments[j] == null || (bestSegments[j].gameTime.totalMilliseconds > attemptSegments[j].gameTime.totalMilliseconds)) {
                        if (attemptSegments[j].gameTime.totalMilliseconds > 0) bestSegments[j] = attemptSegments[j];
                    }

                } 
                else {
                    if (bestSegments[j] == null || (bestSegments[j].realTime.totalMilliseconds > attemptSegments[j].realTime.totalMilliseconds)) {
                        if (attemptSegments[j].realTime.totalMilliseconds > 0)bestSegments[j] = attemptSegments[j];
                    }
                }
            }

            let time = 0;
            if (useGameTime) {
                time = bestSegments.reduce((acc, val) => acc + val.gameTime.totalMilliseconds, 0);
                
            } else {
                time = bestSegments.reduce((acc, val) => acc + val.realTime.totalMilliseconds, 0)
            }

            if (bestSegments.length != this.segments.length) { continue }
            
            if (time > 0) {
                data.push({
                    Date: attempt.started.getTime(),
                    Time: time
                });
            }
        }

        return data;
    }

    private getPlaytimeGraphData(): any[] {
        const data: any[] = [];

        let currentDate = this.attempts[0].started;
        let currentTime = 0;

        for (let i = 0; i < this.attempts.length; i++) {
            const attempt = this.attempts[i];

            if (attempt.started.toLocaleDateString() == currentDate.toLocaleDateString()) {
                currentTime += attempt.getAttemptDuration().totalMilliseconds;
            }
            else {
                data.push({
                    Date: currentDate.toLocaleDateString(),
                    Time: currentTime
                });

                currentDate = attempt.started;
                currentTime = attempt.getAttemptDuration().totalMilliseconds;
            }
        }

        return data;
    }

}

export default Splits;