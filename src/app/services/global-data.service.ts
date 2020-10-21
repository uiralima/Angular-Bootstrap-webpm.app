import { Injectable } from '@angular/core';
import { AppContext } from '../shared/context';

@Injectable()
export class GlobalDataService {

    constructor(private appContext: AppContext) { }

    get serviceUrl(): string {
        if (this.appContext.isTest) {
            return "http://192.168.0.102:3000/";
        }
        else {
            return "";
        }
    }
}