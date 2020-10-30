import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IIdentityService } from '../services/identity.service';
import { NotificationService } from '../services/notification.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

	@Input() public title: string = "";

	private _lastUrl: string = '/work';

	constructor(
		@Inject('IdentityService') protected identityService: IIdentityService,
		protected router: Router,
		protected notification: NotificationService) {
	}

	ngOnInit(): void {
	}

	public get isAuthenticated(): boolean {
		return this.identityService.isAuthenticated();
	}

	public logOff(): void {
		this.identityService.logoff().subscribe(
			() => {
				this.router.navigate(['/']);
			},
			(error) => this.notification.showError(error)
		);
	}

	public isMenu(): boolean {
		return this.router.url === '/menu';
	}

	public changeMenu(): void {
		if (this.isMenu()) {
			this.router.navigate([this._lastUrl]);
		}
		else {
			this._lastUrl = this.router.url;
			this.router.navigate(['/menu']);
		}
	}
}
