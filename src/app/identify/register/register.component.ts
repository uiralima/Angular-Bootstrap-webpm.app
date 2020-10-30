import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Register } from 'src/app/models/register.model';
import { IIdentityService } from 'src/app/services/identity.service';
import { NotificationService } from 'src/app/services/notification.service';

function sameValueValidator(value: string): ValidatorFn {
	return (control: AbstractControl): { [key: string]: boolean } | null => {
		if ((control) && (control.value) && (control.value === value)) {
			return null
		}
		else {
			return { notSame: true };
		}
	}
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css', '../identify.children.css']
})
export class RegisterComponent implements OnInit {

	constructor(
		@Inject('IdentityService') protected identityService: IIdentityService,
		protected router: Router,
		protected notification: NotificationService ) { }

	public registerForm: FormGroup = new FormGroup({
		'email': new FormControl(null, [Validators.required, Validators.email]),
		'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
		'confirmPassword': new FormControl(null, [])
	});

	public disableCommands: boolean = false;

	public registerInfo: Register = new Register("", "");

	public checkValidator(): void {
		this.registerForm.get('confirmPassword').setValidators(sameValueValidator(this.registerForm.value.password));
		this.registerForm.get('confirmPassword').updateValueAndValidity();
	}

	ngOnInit(): void {
	}

	public register() {
		if (this.registerForm.valid) {
			this.disableCommands = true;
			this.identityService.registerByEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
				.subscribe(
					() => {
						this.router.navigate(['']);
						this.disableCommands = false;
					},
					(error) => {
						this.notification.showError(error);
						this.disableCommands = false;
					});
		}
		else {
			this.registerForm.markAllAsTouched();
		}
	}

}
