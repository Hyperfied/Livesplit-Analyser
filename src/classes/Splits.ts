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

    constructor(gameName: string, category: string, platform: string, usesEmulator: boolean, region: string, offset: TimeSpan, attempts: Attempt[], segments: Segment[], personalBest: SegmentTime, sumOfBest: SegmentTime) {
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

        for (let i = 0; i < attemptsTag.children.length; i++) {
            const attemptElement = attemptsTag.children[i];

            const attempt = Attempt.fromXML(attemptElement);
            if (attempt.gameTime.milliseconds > 0) {
                if (attempt.gameTime.milliseconds < personalBest.gameTime.milliseconds) {
                    personalBest.gameTime = attempt.gameTime;
                    personalBest.realTime = attempt.realTime;
                }
            }
            else if (attempt.realTime.milliseconds > 0) {
                if (attempt.realTime.milliseconds < personalBest.realTime.milliseconds) {
                    personalBest.gameTime = attempt.gameTime;
                    personalBest.realTime = attempt.realTime;
                }
            }

            attempts.push(attempt);
        }

        let sumOfBest = new SegmentTime(NaN, new TimeSpan(0), new TimeSpan(0));

        const segments: Segment[] = [];
        const segmentsTag = xml.getElementsByTagName('Segments')[0];

        for (let i = 0; i < segmentsTag.children.length; i++) {
            const segmentElement = segmentsTag.children[i];

            const segment = Segment.fromXML(segmentElement);

            sumOfBest.realTime.addMilliseconds(segment.bestSegmentRealTime.milliseconds);
            sumOfBest.gameTime.addMilliseconds(segment.bestSegmentGameTime.milliseconds);

            segments.push(segment);
        }

        return new Splits(gameName, category, platform, usesEmulator, region, offset, attempts, segments, personalBest, sumOfBest);
    }
}

export default Splits;