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
    public sumOfBest: SegmentTime;

    public totalTimePlayed: TimeSpan;

    public runsCompleted: number;
    public runsNotCompleted: number

    public firstRunDate: Date;
    public latestRunDate: Date;
    public pbRunDate: Date;

    constructor(gameName: string, category: string, platform: string, usesEmulator: boolean, region: string, offset: TimeSpan, attempts: Attempt[], segments: Segment[], 
        personalBest: SegmentTime, sumOfBest: SegmentTime, totalTimePlayed: TimeSpan, runsCompleted: number, runsNotCompleted: number, firstRunDate: Date, 
        latestRunDate: Date, pbRunDate: Date) {
        this.gameName = gameName;
        this.category = category;
        this.platform = platform;
        this.usesEmulator = usesEmulator;
        this.region = region;
        this.offset = offset;
        this.attempts = attempts;
        this.segments = segments;

        this.personalBest = personalBest;
        this.sumOfBest = sumOfBest;

        this.totalTimePlayed = totalTimePlayed;

        this.runsCompleted = runsCompleted;
        this.runsNotCompleted = runsNotCompleted;

        this.firstRunDate = firstRunDate;
        this.latestRunDate = latestRunDate;
        this.pbRunDate = pbRunDate;
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

        let totalTimePlayed = new TimeSpan(0);

        let runsCompleted = 0;
        let runsNotCompleted = 0;

        let firstRunDate = new Date();
        let latestRunDate = new Date();
        let pbRunDate = new Date();

        for (let i = 0; i < attemptsTag.children.length; i++) {
            const attemptElement = attemptsTag.children[i];
            const attempt = Attempt.fromXML(attemptElement);

            if (attempt.gameTime.totalMilliseconds > 0) {
                if (attempt.gameTime.totalMilliseconds < personalBest.gameTime.totalMilliseconds) {
                    personalBest.gameTime = attempt.gameTime;
                    personalBest.realTime = attempt.realTime;
                    pbRunDate = attempt.started;
                }
            }
            else if (attempt.realTime.totalMilliseconds > 0) {
                if (attempt.realTime.totalMilliseconds < personalBest.realTime.totalMilliseconds) {
                    personalBest.gameTime = attempt.gameTime;
                    personalBest.realTime = attempt.realTime;
                    pbRunDate = attempt.started;
                }
            }

            if (attempt.id == 0) {
                firstRunDate = attempt.started;
            }

            if (attempt.id == attemptsTag.children.length - 1) {
                latestRunDate = attempt.started;
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
            runsCompleted, runsNotCompleted, firstRunDate, latestRunDate, pbRunDate);
    }

    public getGraphData(type: string, useGameTime: boolean): any[] {
        const data: any[] = [];

        return data;
    }

}

export default Splits;