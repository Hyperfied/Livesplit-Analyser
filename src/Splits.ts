import TimeSpan from './TimeSpan';

class Splits {
 
    public gameName: string;
    public category: string;
    public platform: string;
    public usesEmulator: boolean;
    public region: string;
    public offset: TimeSpan

    public static fromXML (xml: Document): Splits {
        return new Splits();
    }
}

export default Splits;