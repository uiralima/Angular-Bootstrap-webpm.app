import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import { Activity } from '../models/activity.model';
import { IListActivityCaller } from './list-activity.caller';

@Component({
	selector: 'app-list-activity',
	templateUrl: './list-activity.component.html',
	styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {

	private _caller: IListActivityCaller;

	@Input() public activities: Activity[] = [];

	@Input() public canStart: boolean;

	@Output("startActivity") public startActivityEvent: EventEmitter<Activity> = new EventEmitter();

	@Output("stopActivity") public activityStopped: EventEmitter<boolean> = new EventEmitter();

	ngOnChanges(changes: SimpleChanges): void {

	}

	constructor() { }

	ngAfterViewChecked(): void {
		if ((this.activities) && (this.activities.length > 0)) {
			document.querySelectorAll('[activity-item]').forEach((item: any, index) => {
				item.ondragstart = (e: any) => {
					const itemId = e.target.id.replace('draggable-item-', '')
					const activity = this.activities.reduce((previous, current) => current.id === itemId ? current : previous, null)
					if (activity) {
						e.dataTransfer.setData("item", JSON.stringify(activity))
					}
				}
			})
		}
	}

	ngAfterViewInit(): void {

		const dropZones = document.querySelectorAll('[stop-activity-dropzone]')
		dropZones.forEach((dz: any) => {
			dz.ondragover = (e: any) => {
				e.preventDefault();
			}
			dz.ondrop = e => {
				const activity = <Activity>JSON.parse(e.dataTransfer.getData("item"))
				if (!this.activities.some(item => item.id === activity.id)) {
					this.activityStopped.emit(true)
				}
			}
		})
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

	ngOnInit(): void {

	}

	public startActivity(activity: Activity) {
		if (this.canStart) {
			this.startActivityEvent.emit(activity);
		}
	}

	public stopActivityEvent(result: boolean) {
		this.activityStopped.emit(true);
	}

}
