import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accessToken: string | undefined;

  constructor(private oauthService: OAuthService, private authService: AuthService) {
    this.oauthService.configure(environment.authCodeFlowConfig);
  }

  ngOnInit(): void {}
}
