import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { max } from 'rxjs/operators';
import { Activity } from '../models/activity.model';
import { GlobalDataService } from '../services/global-data.service';
import { UtilsService } from '../services/utils.service';

@Component({
	selector: 'app-current-activity',
	templateUrl: './current-activity.component.html',
	styleUrls: ['./current-activity.component.css']
})
export class CurrentActivityComponent implements OnInit, OnChanges, OnDestroy {

	public iconStep: number = 0;
	public remainTime: number = 0;
	public percentageTime: number = 0;

	@Input() public currentActivity: Activity;

	@Output() public activityStopped: EventEmitter<boolean> = new EventEmitter();

	@Output() public requestStartActive: EventEmitter<number> = new EventEmitter();

	public iconUnsubscribe: Subscription;
	public remainTimeUnsubscribe: Subscription;

	public detailShow: boolean = true;

	constructor(private utils: UtilsService,
		private globalData: GlobalDataService) {

	}

	ngOnDestroy(): void {
		this.doUnsubscribes();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if ((changes.currentActivity.currentValue) && (!changes.currentActivity.previousValue)) {
			let iconObserver = interval(333);
			this.iconUnsubscribe = iconObserver.subscribe((value: number) => {
				this.iconStep = (value % 3) + 1;
			});
			let remainTimeObserver = interval(60000);
			this.remainTime = this.calculateRemainTime();
			this.percentageTime = this.calculateRemainPercentage(this.remainTime);
			this.remainTimeUnsubscribe = remainTimeObserver.subscribe((value: number) => {
				this.remainTime = this.calculateRemainTime();
				this.percentageTime = this.calculateRemainPercentage(this.remainTime);
			})
		}
	}

	public getPercentare(maxValue: number, startOn: number): number {
		return Math.min(this.percentageTime, maxValue) - startOn;
	}

	public getpercentageLabel(maxValue: number): string {
		if (this.percentageTime > maxValue) {
			return "";
		}
		else {
			return this.percentageTime + "%";
		}
	} 

	ngOnInit(): void {
	}

	public calculateRemainTime(): number {
		let lastEvent = this.currentActivity.events[this.currentActivity.events.length - 1];
		if (lastEvent.stopTime === "") {
			let now = this.globalData.serverNow;
			let eventMinutes = Math.floor(((+now) - (+this.utils.dateFromMyString(lastEvent.startTime))) / 60000);
			return this.currentActivity.totalTime - (this.currentActivity.usedTime + eventMinutes);
		}
		else {
			return this.currentActivity.totalTime - this.currentActivity.usedTime;
		}
	}

	public calculateRemainPercentage(remainTime: number): number {
		if ((remainTime < 0) || (this.currentActivity.totalTime <= 0)) {
			return 100;
		}
		else {
			let usedTime = this.currentActivity.totalTime - remainTime;
			if (usedTime < 0) {
				return 0;
			}
			else if (usedTime > this.currentActivity.totalTime) {
				return 100;
			}
			else {
				return Math.floor((100 * usedTime) / this.currentActivity.totalTime);
			}
		}
	}

	public stopActivity(): void {
		this.doUnsubscribes();
		this.iconStep = 0;
		this.activityStopped.emit(true);
	}

	private doUnsubscribes(): void {
		if (this.iconUnsubscribe) {
			this.iconUnsubscribe.unsubscribe();
		}
		if (this.remainTimeUnsubscribe) {
			this.remainTimeUnsubscribe.unsubscribe()
		}
	}

}
