import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IIdentityService } from 'src/app/services/identity.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css', '../identify.children.css']
})
export class LoginComponent implements OnInit {

	public disableCommands: boolean = false;

	public loginForm: FormGroup = new FormGroup({
		'email': new FormControl(null, [Validators.email]),
		'password': new FormControl(null, [Validators.minLength(6)])
	});

	constructor(
		@Inject('IdentityService') protected identityService: IIdentityService,
		protected router: Router,
		protected notification: NotificationService
	) { }

	ngOnInit(): void {
	}

	public login(): void {
		if (this.loginForm.valid) {
			this.disableCommands = true;
			this.identityService.login(this.loginForm.value.email, this.loginForm.value.password)
			.subscribe(
				() => {
					this.router.navigate(['work']);
					this.disableCommands = false;
				},
				(error) => {
					this.notification.showError(error);
					this.disableCommands = false;
				}
			)
		}
	}

}
