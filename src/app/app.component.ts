import { Component, Inject, OnDestroy, OnInit } from '@angular/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'WebPM App';

	constructor() { }

	ngOnInit(): void {
	}
}
