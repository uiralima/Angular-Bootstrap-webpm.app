import { Activity } from './activity.model';
import { Roleable } from './roeable.model';

export class Project extends Roleable {
    constructor(owner: string) {
        super(owner);    
    }
    public id: string;
    public fullname: string;
    public activities: Activity[] = [];
}