import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../models/activity.model';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class ActivityService {
    constructor(protected http: HttpClient,
    protected globalData: GlobalDataService) {}

    getAll(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.globalData.serviceUrl + "activities");
    }

    getAvaliable(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.globalData.serviceUrl + "activities?status=ativo");
    }

    getCurrent(): Observable<Activity> {
        return this.http.get<Activity[]>(this.globalData.serviceUrl + "activities?status=andamento").pipe(
            map((data: Activity[]) => {
                if (data.length > 0) {
                    return data[0];
                }
                else {
                    return null;
                }
            })
        )
    }

    startActivity(activity: Activity): Observable<Activity> {
        activity.status = "andamento";
        return this.http.put<Activity>(this.globalData.serviceUrl + "activities/" + activity.id, activity);
    }

    stopActivity(activity: Activity): Observable<Activity> {
        activity.status = "ativo";
        return this.http.put<Activity>(this.globalData.serviceUrl + "activities/" + activity.id, activity);
    }
}