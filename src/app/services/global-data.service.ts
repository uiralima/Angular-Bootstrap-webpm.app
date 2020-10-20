import { Injectable } from '@angular/core';
import { AppContext } from '../shared/context';

@Injectable()
export class GlobalDataService {

    constructor(private appContext: AppContext) { }

    get serviceUrl(): string {
        if (this.appContext.isTest) {
            return "http://localhost:3000/";
        }
        else {
            return "";
        }
    }
}