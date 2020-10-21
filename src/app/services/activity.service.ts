import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';

export interface ActivityService {
    getAll(): Observable<Activity[]>;
    getAvaliable(): Observable<Activity[]>;
    getCurrent(): Observable<Activity>;
    startActivity(activity: Activity): Observable<Activity>;
    stopActivity(activity: Activity): Observable<Activity>
}