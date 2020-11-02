import { Inject, Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Activity } from 'src/app/models/activity.model';
import { Project } from 'src/app/models/project.model';
import { AppContext } from 'src/app/shared/context';
import { IActivityService } from '../activity.service';
import { IIdentityService } from '../identity.service';
import { IProjectService } from '../project.service';
import { Event } from 'src/app/models/event.modal';
import { UtilsService } from '../utils.service';
import { take } from 'rxjs/internal/operators/take';

@Injectable()
export class FirebaseActivityService implements IActivityService {

    constructor(
        @Inject('ProjectService') protected projectService: IProjectService,
        @Inject('IdentityService') protected identityService: IIdentityService,
        protected appContext: AppContext,
        protected utils: UtilsService) {
    }

    private getMyActivities(projects: Project[]): Activity[] {
        let result: Activity[] = [];
        if (this.identityService.currentUser) {
            for (let i = 0; i < projects.length; i++) {
                for (let j = 0; j < projects[i].activities.length; j++) {
                    if (projects[i].activities[j].responsible === this.identityService.currentUser.uid) {
                        result.push(projects[i].activities[j]);
                    }
                }
            }
        }
        return result;
    }

    private getMyAvaliableActivities(projects: Project[]): Activity[] {
        let result: Activity[] = [];
        if (this.identityService.currentUser) {
            for (let i = 0; i < projects.length; i++) {
                for (let j = 0; j < projects[i].activities.length; j++) {
                    if ((projects[i].activities[j].responsible === this.identityService.currentUser.uid) &&
                        (projects[i].activities[j].status === 'ativo')) {
                        result.push(projects[i].activities[j]);
                    }
                }
            }
        }
        return result;
    }

    private getMyCurrent(projects: Project[]): Activity {
        let result: Activity[] = [];
        if (this.identityService.currentUser) {
            for (let i = 0; i < projects.length; i++) {
                for (let j = 0; j < projects[i].activities.length; j++) {
                    if ((projects[i].activities[j].responsible === this.identityService.currentUser.uid) &&
                        (projects[i].activities[j].status === 'andamento')) {
                        return projects[i].activities[j];
                    }
                }
            }
        }
        return null;
    }

    public getAll(): Observable<Activity[]> {
        return new Observable((observer: Observer<Activity[]>) => {
            this.projectService.getAll().subscribe((projects: Project[]) => {
                observer.next(this.getMyActivities(projects));
            })
        });
    }

    public getAvaliable(): Observable<Activity[]> {
        return new Observable((observer: Observer<Activity[]>) => {
            this.projectService.getAll().subscribe((projects: Project[]) => {
                observer.next(this.getMyAvaliableActivities(projects));
            })
        });
    }

    public getCurrent(): Observable<Activity> {
        return new Observable((observer: Observer<Activity>) => {
            this.projectService.getAll().subscribe((projects: Project[]) => {
                observer.next(this.getMyCurrent(projects));
            })
        });
    }

    public startActivity(activity: Activity): Observable<Activity> {
        // A lógica abaixo estará no servidor
        if (this.appContext.fakeServer) {
            if (!activity.events) {
                activity.events = [];
            }
            activity.events.push(new Event(this.utils.nowToMyString(), "", "", 0));
            activity.status = "andamento";
            let unsub = this.projectService.get(activity.projectId).pipe(
                take(1)
              ).subscribe((project: Project) => {
                if (project) {
                    for (let i = 0; i < project.activities.length; i++) {
                        if (project.activities[i].id === activity.id) {
                            project.activities[i] = activity;
                            break;
                        }
                    }
                    this.projectService.updateActivity(project.id, project.activities).subscribe();
                }
            })
            return of(activity);
        }
    }

    public stopActivity(activity: Activity, finish: boolean): Observable<Activity> {
        if (this.appContext.fakeServer) {
            let event = activity.events[activity.events.length - 1];
            event.stopTime = this.utils.nowToMyString();
            event.totalSeconds = ((+this.utils.dateFromMyString(event.stopTime)) - (+this.utils.dateFromMyString(event.startTime))) / 1000;
            let totalSeconds = 0;
            activity.events.map((event) => {
                totalSeconds += event.totalSeconds;
            })
            activity.usedTime = Math.floor(totalSeconds / 60);
            if (finish) {
                activity.status = "finalizado"
            }
            else {
                activity.status = "ativo";
            }
            this.projectService.get(activity.projectId).pipe(
                take(1)
              ).subscribe((project: Project) => {
                if (project) {
                    for (let i = 0; i < project.activities.length; i++) {
                        if (project.activities[i].id === activity.id) {
                            project.activities[i] = activity;
                            break;
                        }
                    }
                    this.projectService.updateActivity(project.id, project.activities).subscribe();
                }
            })
            return of(activity);
        }
    }
}