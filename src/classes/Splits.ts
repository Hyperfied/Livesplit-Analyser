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
            attempts.push(Attempt.fromXML(attemptElement));
        }

        const segments: Segment[] = [];
        const segmentsTag = xml.getElementsByTagName('Segments')[0];

        for (let i = 0; i < segmentsTag.children.length; i++) {
            const segmentElement = segmentsTag.children[i];

            segments.push(Segment.fromXML(segmentElement));
        }

        return new Splits(gameName, category, platform, usesEmulator, region, offset, attempts, segments);
    }
}

export default Splits;