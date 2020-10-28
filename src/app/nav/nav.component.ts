import { Component, Inject, Input, OnInit } from '@angular/core';
import { IIdentityService } from '../services/identity.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() public title: string = "";
  constructor(@Inject('IdentityService') protected identityService: IIdentityService) { }

  ngOnInit(): void {
  }

  public get isAuthenticated(): boolean {
    return this.identityService.isAuthenticated(); 
  }

  public logOff(): void {
    this.identityService.logoff().subscribe();
  }

}
