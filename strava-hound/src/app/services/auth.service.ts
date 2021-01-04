// tslint:disable: no-non-null-assertion
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _accessToken = '';
  private _refreshToken = '';
  private _authCode = '';
  private _auth: AuthConfig;

  constructor(private http: HttpClient, private router: Router) {
    this._auth = environment.authCodeFlowConfig;
  }

  public login(): void {
    let params = new HttpParams();
    params = params.append('client_id', this._auth.clientId!);
    params = params.append('redirect_uri', this._auth.redirectUri!);
    params = params.append('response_type', this._auth.responseType!);
    params = params.append('scope', this._auth.scope!);
    window.location.href = this._auth.loginUrl + '?' + params.toString();
  }

  public getTokens(): void {
    let params = new HttpParams();
    params = params.append('client_id', this._auth.clientId!);
    params = params.append('client_secret', this._auth.dummyClientSecret!);
    params = params.append('code', this._authCode);
    params = params.append('grant_type', 'authorization_code');

    this.http.post(this._auth.tokenEndpoint!, null, {params})
      .subscribe(res => {
        console.log(res);
      });
  }

  public saveAuthCode(code: string): void {
    this._authCode = code;
  }
}
