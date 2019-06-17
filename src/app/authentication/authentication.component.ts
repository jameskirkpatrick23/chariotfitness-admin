import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OktaAuthService } from '@okta/okta-angular';
import {ProgramService} from '../program.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  isAuthenticated: boolean;
  constructor(
    public oktaAuth: OktaAuthService,
    private programService: ProgramService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      console.warn('i am already authenticated and am gettig headers')
      await this.programService.setHeaders();
    }
  }

  async login() {
    this.oktaAuth.loginRedirect('/programs');
  }

  logout() {
    this.oktaAuth.logout('/');
  }

}
