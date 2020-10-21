import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {

  @Input() public activities: Activity[] = [];

  @Input() public canStart: boolean;

  @Output("startActivity") public startActivityEvent: EventEmitter<Activity> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public startActivity(activity: Activity) {
    if (this.canStart) {
      this.startActivityEvent.emit(activity);
    }
  }

}
