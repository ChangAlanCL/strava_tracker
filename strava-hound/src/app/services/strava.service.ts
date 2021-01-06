import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from '../models/Athlete';
import { SummaryActivity } from '../models/SummaryActivity';

@Injectable({
  providedIn: 'root',
})
export class StravaService {
  private baseUrl = 'https://www.strava.com/api/v3';

  constructor(private http: HttpClient) {}

  public getLoggedInAthlete(): Observable<Athlete> {
    return this.http.get<Athlete>(`${this.baseUrl}/athlete`);
  }

  public getLoggedInAthleteActivities(
    before: number,
    after: number,
    page: number = 1,
    perPage: number = 30
  ): Observable<SummaryActivity[]> {
    let params = new HttpParams();
    params = params.append('before', before.toString());
    params = params.append('after', after.toString());
    params = params.append('page', page.toString());
    params = params.append('per_page', perPage.toString());

    return this.http.get<SummaryActivity[]>(`${this.baseUrl}/athlete/activities`, { params });
  }
}
