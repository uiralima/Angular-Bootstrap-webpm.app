import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { IIdentityService } from '../services/identity.service';


@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit, OnDestroy {

  public currentActivity: Activity = null;

  public activities: Activity[] = [];

  constructor(
    @Inject('ActivityService') public activityService: ActivityService,
    @Inject('IdentityService') protected identityService: IIdentityService) { }

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
}
