export class Activity {
    constructor(
        public id: number,
        public fullname: string,
        public description: string,
        public projectName: string,
        public totalTime: number,
        public usedTime: number,
        public deadLineDate: string,
        public status: string
    ) {}
    
}