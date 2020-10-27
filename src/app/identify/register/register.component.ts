import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'firebase';
import { Register } from 'src/app/models/register.model';
import { IIdentityService } from 'src/app/services/identity.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css', '../identify.children.css']
})
export class RegisterComponent implements OnInit { 

	constructor(@Inject('IdentityService') public identityService: IIdentityService) {}

	public registerForm: FormGroup = new FormGroup({
		'email': new FormControl(null),
		'password': new FormControl(null),
		'confirmPassword': new FormControl(null)
	});

	public registerInfo: Register = new Register("", "");

	ngOnInit(): void {
	}

	public register() {
		if (this.registerForm.valid) {
			this.identityService.registerByEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
			.subscribe((data: User) => {
				console.log(data);
			},
			error => console.log("Erro ! " + error));
		}
		else {
			console.log(this.registerForm.errors);
		}
	}

}
