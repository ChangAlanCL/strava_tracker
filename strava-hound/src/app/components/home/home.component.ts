import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/app/models/Athlete';
import { AuthService } from 'src/app/services/auth.service';
import { StravaService } from 'src/app/services/strava.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public hasAuthorized = false;
  public athlete!: Athlete | null;
  public a: any;

  constructor(private authService: AuthService, private stravaService: StravaService) {}

  ngOnInit(): void {
    this.hasAuthorized = this.authService.hasAuthorized();

    if (this.hasAuthorized) {
      this.athlete = this.authService.getAthleteDetails();
      this.stravaService.getLoggedInAthlete().subscribe((x) => (this.a = x));

      const now = Math.round(Date.now() / 1000);
      const monthInSeconds = 30 * 24 * 60 * 60;
      const past = now - monthInSeconds;
      this.stravaService.getLoggedInAthleteActivities(now, past).subscribe((x) => console.log(x));
    }
  }

  public authenticateViaStrava(): void {
    console.log('~~~~~loggin with auth service~~~~~');
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout().add(() => (this.hasAuthorized = this.authService.hasAuthorized()));
  }
}
