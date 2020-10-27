import { Component, Inject, OnInit } from '@angular/core';
import { Register } from '../models/register.model';
import { IIdentityService } from '../services/identity.service';

@Component({
	selector: 'app-identify',
	templateUrl: './identify.component.html',
	styleUrls: ['./identify.component.css']
})
export class IdentifyComponent implements OnInit {

	constructor(@Inject('IdentityService') public identityService: IIdentityService) { }

	ngOnInit(): void {
	}

	public doRegister(data: Register): void {
		console.log(data);
	}

}
