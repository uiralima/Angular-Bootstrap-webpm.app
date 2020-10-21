import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Activity } from './models/activity.model';
import { ActivityService } from './services/activity.service';
import { AppContext } from './shared/context';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WebPM App';

  public currentActivity: Activity = null;

  public activities: Activity[] = [];

  constructor(
    @Inject('ActivityService') public activityService: ActivityService) { }

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
