import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IIdentityService } from './services/identity.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'WebPM App';

	private currentUserInfoLoaded: boolean = false;

	constructor(@Inject('IdentityService') protected identityService: IIdentityService) { }

	ngOnInit(): void {
		this.identityService.loaded().subscribe(() => this.currentUserInfoLoaded = true);
	}

	// Indica que toda a carga inicial do sistema foi carregada, a aplicação só é liberada quando retornar true;
	public get allLoaded(): boolean {
		return this.currentUserInfoLoaded;
	}
}
