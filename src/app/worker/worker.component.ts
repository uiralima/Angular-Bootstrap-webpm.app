import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { IListActivityCaller } from '../list-activity/list-activity.caller';
import { ListActivityComponent } from '../list-activity/list-activity.component';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { IIdentityService } from '../services/identity.service';
import { IProjectCaller } from './project/project.caller';


@Component({
	selector: 'app-worker',
	templateUrl: './worker.component.html',
	styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit, OnDestroy, IListActivityCaller, IProjectCaller {

	private _currentActivity: Activity = null;
	public set currentActivity(activity: Activity) {
		this._currentActivity = activity;
		this.CurrentActivityChanged.emit(this._currentActivity);
	}
	public get currentActivity(): Activity {
		return this._currentActivity;
	}

	private _activities: Activity[] = [];
	public set activities(activities: Activity[]) {
		this._activities = activities;
		this.ActivitiesChanged.emit(this._activities);
	}
	public get activities(): Activity[] {
		return this._activities;
	}

	private _ref: ListActivityComponent;

	constructor(
		@Inject('ActivityService') public activityService: ActivityService,
		@Inject('IdentityService') protected identityService: IIdentityService) { }

	public ActivitiesChanged: EventEmitter<Activity[]> = new EventEmitter();
	public CurrentActivityChanged: EventEmitter<Activity> = new EventEmitter();

	private emitAll(): void {
		this.ActivitiesChanged.emit(this.activities);
		this.CurrentActivityChanged.emit(this.currentActivity);
	}

	ngOnDestroy(): void {
	}

	ngOnInit(): void {
		this.getAvaliable();
		this.getCurrent();
	}

	public getAvaliable() {
		this.activityService.getAvaliable().subscribe(
			(data: Activity[]) => {
				this.activities = data;
			})
	}

	public getCurrent() {
		this.activityService.getCurrent().subscribe(
			(currentActivity: Activity) => {
				this.currentActivity = currentActivity;
			})
	}

	public activityStopped(reload: boolean = true) {
		if (this.currentActivity) {
			this.activityService.stopActivity(this.currentActivity).subscribe(
				(data: Activity) => {
					this.currentActivity = null;
					if (reload) {
						this.getAvaliable();
					}
				}
			);
		}
	}

	public startActivity(activity: Activity) {
		this.activityService.startActivity(activity).subscribe(
			(data: Activity) => {
				this.currentActivity = data
				this.getAvaliable();
			}
		);
	}

	public onActivate(componentReference: any): void {
		if ("startActivityEvent" in componentReference) {
			componentReference.startActivityEvent.subscribe((activity: Activity) => {
				this.startActivity(activity);
			});
		}
		if ("setCaller" in componentReference) {
			componentReference.setCaller(this);
		}
		this.emitAll();
	}
}
