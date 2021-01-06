import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Athlete } from 'src/app/models/Athlete';
import { SummaryActivity } from 'src/app/models/SummaryActivity';
import { AuthService } from 'src/app/services/auth.service';
import { StravaService } from 'src/app/services/strava.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsub = new Subject();

  public DateRange = [30, 60, 90, 120];
  public dateRangeSelected = new FormControl(this.DateRange[0]);
  public hasAuthorized = false;
  public athlete!: Athlete | null;
  public activities: { date: string; heartrate: number }[] = [];

  displayedColumns: string[] = ['date', 'heartrate'];

  constructor(private authService: AuthService, private stravaService: StravaService) {}

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  ngOnInit(): void {
    this.hasAuthorized = this.authService.hasAuthorized();

    if (this.hasAuthorized) {
      this.athlete = this.authService.getAthleteDetails();
      this._getActivities();
    }

    // detects if date range has been changed
    this.dateRangeSelected.valueChanges.pipe(takeUntil(this.ngUnsub)).subscribe((x) => {
      this._getActivities();
    });
  }

  private _getActivities(): void {
    const now = Math.round(Date.now() / 1000);
    const monthInSeconds = this.dateRangeSelected.value * 24 * 60 * 60;
    const past = now - monthInSeconds;
    this.stravaService.getLoggedInAthleteActivities(now, past, 1, 100).subscribe((x) => {
      this.activities = x.map((a) => {
        const h = new Date(a.start_date_local).toLocaleDateString('en-AU');
        return { date: h, heartrate: a.average_heartrate };
      });
    });
  }

  public authenticateViaStrava(): void {
    console.log('~~~~~loggin with auth service~~~~~');
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout().add(() => (this.hasAuthorized = this.authService.hasAuthorized()));
  }
}
