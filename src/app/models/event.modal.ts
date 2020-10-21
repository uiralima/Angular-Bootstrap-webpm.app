export class Event {
    constructor(
        public startTime: string,
        public stopTime: string,
        public note: string,
        public totalSeconds: number
    ) {}
}