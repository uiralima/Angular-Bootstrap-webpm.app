import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../models/activity.model';
import { Event } from '../models/event.modal';
import { AppContext } from '../shared/context';
import { GlobalDataService } from './global-data.service';
import { UtilsService } from './utils.service';

@Injectable()
export class ActivityService {
    constructor(protected http: HttpClient,
        protected globalData: GlobalDataService,
        protected utils: UtilsService,
        public appContext: AppContext) { }

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
        // A lógica abaixo estará no servidor
        if (this.appContext.fakeServer) {
            if (!activity.events) {
                activity.events = [];
            }
            activity.events.push(new Event(this.utils.nowToMyString(), "", "", 0));
            activity.status = "andamento";
        }
        return this.http.put<Activity>(this.globalData.serviceUrl + "activities/" + activity.id, activity);
    }

    stopActivity(activity: Activity): Observable<Activity> {
        // A lógica abaixo estará no servidor
        if (this.appContext.fakeServer) {
            let event = activity.events[activity.events.length - 1];
            event.stopTime = this.utils.nowToMyString();
            event.totalSeconds = ((+this.utils.dateFromMyString(event.stopTime)) - (+this.utils.dateFromMyString(event.startTime))) / 1000;
            activity.status = "ativo";
            let totalSeconds = 0;
            activity.events.map((event) => {
                totalSeconds += event.totalSeconds;
            })
            activity.usedTime = Math.floor(totalSeconds / 60);
        }
        return this.http.put<Activity>(this.globalData.serviceUrl + "activities/" + activity.id, activity);
    }
}