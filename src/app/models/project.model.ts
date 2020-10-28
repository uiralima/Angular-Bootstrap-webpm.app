import { Activity } from './activity.model';
import { Roleable } from './roeable.model';

export class Project extends Roleable {
    public ownerId: string;
    public fullname: string;
    public activities: Activity[];
}