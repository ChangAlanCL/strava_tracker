import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private oauthService: OAuthService, private authService: AuthService) {
    this.oauthService.configure(environment.authCodeFlowConfig);
  }

  ngOnInit(): void {}

  tryLogin(): void {
    console.log('----- using oauth lib -----');
    this.oauthService.initCodeFlow();
  }

  loginWithCustom(): void {
    console.log('~~~~~loggin with auth service~~~~~');
    this.authService.login();
  }

  tryLogout(): void {
    console.log('trying to log out from Strava');
    this.oauthService.logOut();
  }

  getAccessToken(): void {
    console.log('not implemented');
  }
}
