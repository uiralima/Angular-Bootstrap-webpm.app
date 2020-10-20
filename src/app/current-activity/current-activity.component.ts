import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-current-activity',
  templateUrl: './current-activity.component.html',
  styleUrls: ['./current-activity.component.css']
})
export class CurrentActivityComponent implements OnInit {

  @Input() public currentActivity: Activity;

  @Output() public activityStopped: EventEmitter<boolean> = new EventEmitter();

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  public stopActivity(): void {
    this.activityStopped.emit(true);
  }

}
