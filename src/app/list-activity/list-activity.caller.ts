import { EventEmitter } from '@angular/core';
import { Activity } from '../models/activity.model';

export interface IListActivityCaller {
    ActivitiesChanged: EventEmitter<Activity[]>;
    CurrentActivityChanged: EventEmitter<Activity>;
}