import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';

export interface IActivityService {
    getAll(): Observable<Activity[]>;
    getAvaliable(): Observable<Activity[]>;
    getCurrent(): Observable<Activity>;
    startActivity(activity: Activity): Observable<Activity>;
    stopActivity(activity: Activity, finish: boolean): Observable<Activity>
}