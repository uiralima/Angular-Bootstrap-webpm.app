import { Event } from './event.modal';

export class Activity {
    constructor(
        public id: string,
        public fullname: string,
        public description: string,
        public projectId: string,
        public totalTime: number,
        public usedTime: number,
        public deadLineDate: string,
        public status: string,
        public owner: string,
        public responsible: string,
        public events: Event[]= []
        
    ) {}
    
}