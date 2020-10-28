import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Activity } from '../models/activity.model';
import { IListActivityCaller } from './list-activity.caller';

@Component({
	selector: 'app-list-activity',
	templateUrl: './list-activity.component.html',
	styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {

	private _caller: IListActivityCaller;

	@Input() public activities: Activity[] = [];

	@Input() public canStart: boolean;

	@Output("startActivity") public startActivityEvent: EventEmitter<Activity> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	public setCaller(caller: IListActivityCaller): void {
		this._caller = caller;
		this._caller.ActivitiesChanged.subscribe((activities: Activity[]) => {
			this.activities = activities;
		});
		this._caller.CurrentActivityChanged.subscribe((activity: Activity) => {
			this.canStart = activity == undefined;
		});
	}

	public startActivity(activity: Activity) {
		if (this.canStart) {
			this.startActivityEvent.emit(activity);
		}
	}

}
