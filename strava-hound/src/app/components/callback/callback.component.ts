import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  template: `<div></div>`,
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params?.code !== undefined) {
        this.authService.saveAuthCode(params.code);
        this.authService.fetchTokens().add(() => this.router.navigate(['/']));
      } else {
        this.router.navigate(['error']);
      }
    });
  }
}
