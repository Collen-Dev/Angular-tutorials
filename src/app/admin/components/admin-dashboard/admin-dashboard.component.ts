import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import {CommonModule} from '@angular/common'
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from '../../../services/auth.service'
import { InactivityService } from '../../../services/inactivity.service';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  countdown = 0;
  showModal = false;
  private warningSub?: Subscription;

  private router = inject(Router)
  private auth = inject(AuthService)
  private inactivityService = inject(InactivityService)

  ngOnInit(): void {
    this.warningSub = this.inactivityService.warning$.subscribe(seconds => {
      this.countdown = seconds;
      this.showModal = seconds > 0;
    });
  }

  ngOnDestroy(): void {
    this.warningSub?.unsubscribe();
  }

  stayLoggedIn() {
    this.inactivityService.extendSession();
    this.showModal = false;
  }

  onLogout() {
  this.auth.logout().subscribe({
        next: () => this.router.navigate(['/admin/login']),
        error: (err: HttpErrorResponse) => {
          console.error(err); 
        }
      });
}
}