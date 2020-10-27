import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../identify.children.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null)
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
