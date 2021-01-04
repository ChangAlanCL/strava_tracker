// tslint:disable: no-non-null-assertion
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Athlete } from '../models/Athlete';
import { StravaToken, StravaUser } from '../models/StravaUser';

const STRAVA = {
  type: 'stravaType',
  accessToken: 'stravaAccessToken',
  expiresAt: 'stravaExpiresAt',
  expiresIn: 'stravaExpiresIn',
  refreshToken: 'stravaRefreshToken',
  athlete: 'stravaAthlete',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authCode = '';
  private auth: AuthConfig;

  constructor(private http: HttpClient, private router: Router) {
    this.auth = environment.authCodeFlowConfig;
  }

  public hasAuthorized(): boolean {
    const expriyString = localStorage.getItem(STRAVA.expiresAt);
    if (expriyString !== undefined && expriyString !== null) {
      const expiry = parseInt(expriyString, 10);
      const now = Math.round(Date.now() / 1000);
      return expiry > now;
    }
    return false;
  }

  public login(): void {
    let params = new HttpParams();
    params = params.append('client_id', this.auth.clientId!);
    params = params.append('redirect_uri', this.auth.redirectUri!);
    params = params.append('response_type', this.auth.responseType!);
    params = params.append('scope', this.auth.scope!);
    window.location.href = this.auth.loginUrl + '?' + params.toString();
  }

  public logout(): Subscription {
    let params = new HttpParams();
    params = params.append('access_token', localStorage.getItem(STRAVA.accessToken)!);

    return this.http.post(this.auth.logoutUrl!, null, { params }).subscribe(() => {
      localStorage.clear();
    });
  }

  /** Fetch jwt via strava oauth service - with auth code from calling login */
  public fetchTokens(): Subscription {
    let params = new HttpParams();
    params = params.append('client_id', this.auth.clientId!);
    params = params.append('client_secret', this.auth.dummyClientSecret!);
    params = params.append('code', this.authCode);
    params = params.append('grant_type', 'authorization_code');

    return this.http
      .post<StravaUser>(this.auth.tokenEndpoint!, null, { params })
      .subscribe((res) => {
        this._saveStravaTokens(res);
        this._saveStravaAthlete(res.athlete);
      });
  }

  public refreshTokens(): void {
    let params = new HttpParams();
    params = params.append('client_id', this.auth.clientId!);
    params = params.append('client_secret', this.auth.dummyClientSecret!);
    params = params.append('grant_type', 'refresh_token');
    params = params.append('refresh_token', localStorage.getItem(STRAVA.refreshToken)!);

    this.http
      .post<StravaToken>(this.auth.tokenEndpoint!, null, { params })
      .subscribe((r) => {
        this._saveStravaTokens(r);
        console.log('refresh token ----', r);
      });
  }

  /** Save OAuth Authentication Code */
  public saveAuthCode(code: string): void {
    this.authCode = code;
  }

  /** Get athlete details */
  public getAthleteDetails(): Athlete | null {
    let athlete: Athlete;
    const aString = localStorage.getItem(STRAVA.athlete);
    if (aString !== null) {
      athlete = JSON.parse(aString);
      return athlete;
    }
    return null;
  }

  /** Get Access Token */
  public accessToken(): string | null {
    return localStorage.getItem(STRAVA.accessToken);
  }

  /** Get Authorization Header, type + token */
  public getAuthHeader() {
    return localStorage.getItem(STRAVA.type)! + ' ' + localStorage.getItem(STRAVA.accessToken);
  }

  private _saveStravaTokens(t: StravaToken): void {
    localStorage.setItem(STRAVA.type, t.token_type);
    localStorage.setItem(STRAVA.accessToken, t.access_token);
    localStorage.setItem(STRAVA.refreshToken, t.refresh_token);
    localStorage.setItem(STRAVA.expiresAt, t.expires_at.toString());
    localStorage.setItem(STRAVA.expiresIn, t.expires_in.toString());
  }

  private _saveStravaAthlete(a: Athlete): void {
    localStorage.setItem(STRAVA.athlete, JSON.stringify(a));
  }
}
