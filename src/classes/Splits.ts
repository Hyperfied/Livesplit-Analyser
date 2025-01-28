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

    constructor(gameName: string, category: string, platform: string, usesEmulator: boolean, region: string, offset: TimeSpan, attempts: Attempt[], segments: Segment[]) {
        this.gameName = gameName;
        this.category = category;
        this.platform = platform;
        this.usesEmulator = usesEmulator;
        this.region = region;
        this.offset = offset;
        this.attempts = attempts;
        this.segments = segments;
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

        for (let i = 0; i < attemptsTag.children.length; i++) {
            const attemptElement = attemptsTag.children[i];

            const id = parseInt(attemptElement.getAttribute('id') || 'NaN');
            const started = new Date(attemptElement.getAttribute('started') || 'Invalid Date');
            const ended = new Date(attemptElement.getAttribute('ended') || 'Invalid Date');

            const realTime = TimeSpan.parseString(attemptElement.getElementsByTagName('RealTime')[0].textContent || '00:00:00');
            const gameTime = TimeSpan.parseString(attemptElement.getElementsByTagName('GameTime')[0].textContent || '00:00:00');
            const pauseTime = TimeSpan.parseString(attemptElement.getElementsByTagName('PauseTime')[0].textContent || '00:00:00');

            attempts.push(new Attempt(id, started, ended, realTime, gameTime, pauseTime));
        }

        const segments: Segment[] = [];
        const segmentsTag = xml.getElementsByTagName('Segments')[0];

        for (let i = 0; i < segmentsTag.children.length; i++) {
            const segmentElement = segmentsTag.children[i];

            const name = segmentElement.getElementsByTagName('Name')[0].textContent || 'Unknown Segment';

            const bestSegmentRealTime = TimeSpan.parseString(segmentElement.getElementsByTagName('BestSegmentTime')[0].getElementsByTagName("RealTime")[0].textContent || '00:00:00');
            const bestSegmentGameTime = TimeSpan.parseString(segmentElement.getElementsByTagName('BestSegmentTime')[0].getElementsByTagName("GameTime")[0].textContent || '00:00:00');

            const realTimeOnPB = TimeSpan.parseString(segmentElement.getElementsByTagName('SplitTimes')[0].getElementsByTagName("SplitTime")[0].getElementsByTagName("RealTime")[0].textContent || '00:00:00');
            const gameTimeOnPB = TimeSpan.parseString(segmentElement.getElementsByTagName('SplitTimes')[0].getElementsByTagName("SplitTime")[0].getElementsByTagName("GameTime")[0].textContent || '00:00:00');

            const segmentTimes: SegmentTime[] = [];
            const segmentTimesTag = segmentElement.getElementsByTagName('SegmentHistory')[0];

            for (let j = 0; j < segmentTimesTag.children.length; j++) {
                const segmentTimeElement = segmentTimesTag.children[j];

                const runID = parseInt(segmentTimeElement.getAttribute('id') || 'NaN');
                const realTime = TimeSpan.parseString(segmentTimeElement.getElementsByTagName('RealTime')[0].textContent || '00:00:00');
                const gameTime = TimeSpan.parseString(segmentTimeElement.getElementsByTagName('GameTime')[0].textContent || '00:00:00');

                segmentTimes.push(new SegmentTime(runID, realTime, gameTime));
            }

            segments.push(new Segment(name, bestSegmentRealTime, bestSegmentGameTime, realTimeOnPB, gameTimeOnPB, segmentTimes));
        }

        return new Splits(gameName, category, platform, usesEmulator, region, offset, attempts, segments);
    }
}

export default Splits;