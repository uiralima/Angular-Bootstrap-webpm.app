import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-current-activity',
  templateUrl: './current-activity.component.html',
  styleUrls: ['./current-activity.component.css']
})
export class CurrentActivityComponent implements OnInit, OnChanges, OnDestroy {

  public iconStep: number = 0;

  @Input() public currentActivity: Activity;

  @Output() public activityStopped: EventEmitter<boolean> = new EventEmitter();

  @Output() public requestStartActive: EventEmitter<number> = new EventEmitter(); 

  public iconUnsubscribe: Subscription;

  constructor() { 
    
  }
  ngOnDestroy(): void {
    if (this.iconUnsubscribe) {
      this.iconUnsubscribe.unsubscribe();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if ((changes.currentActivity.currentValue) && (!changes.currentActivity.previousValue)) {
      let iconObserver = interval(333);
      this.iconUnsubscribe = iconObserver.subscribe((value: number) => {
        this.iconStep = (value % 3) + 1;
      })
    }
  }

  ngOnInit(): void {
  }

  public stopActivity(): void {
    if (this.iconUnsubscribe) {
      this.iconUnsubscribe.unsubscribe();
    }
    this.iconStep = 0;
    this.activityStopped.emit(true);
  }

}
