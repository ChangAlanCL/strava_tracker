// tslint:disable: no-non-null-assertion
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public login(): void {
    const auth = environment.authCodeFlowConfig;
    let params = new HttpParams();
    params = params.append('client_id', auth.clientId!);
    params = params.append('redirect_uri', auth.redirectUri!);
    params = params.append('response_type', auth.responseType!);
    params = params.append('scope', auth.scope!);
    window.location.href = auth.loginUrl + '?' + params.toString();
  }
}
