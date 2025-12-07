import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class InactivityService {

  private inactivityTimeout = 2 * 60 * 1000; // 4 min
  private warningDuration = 60 * 1000; // 1 min before auto logout
  private warningSubject = new Subject<number>(); // emits countdown seconds
  warning$ = this.warningSubject.asObservable();

  private timerRef?: ReturnType<typeof setTimeout>;
  private countdownInterval?: ReturnType<typeof setInterval>;
  private auth = inject(AuthService) 
  private router = inject(Router)

  constructor() {
    this.startTracking();
  }

  private startTracking() {
    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach(event =>
      document.addEventListener(event, () => this.resetTimer())
    );

    this.resetTimer();
  }

  private resetTimer() {
    if (this.timerRef) clearTimeout(this.timerRef);
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    // Start main inactivity timer
    this.timerRef = setTimeout(() => this.showWarning(), this.inactivityTimeout);
  }

  private showWarning() {
    let seconds = this.warningDuration / 1000;

    // Emit countdown every second
    this.countdownInterval = setInterval(() => {
      this.warningSubject.next(seconds);
      seconds--;

      if (seconds < 0) {
        clearInterval(this.countdownInterval);
        this.autoLogout();
      }
    }, 1000);
  }

  extendSession() {
    // Called from component if user clicks "Stay Logged In"
    clearInterval(this.countdownInterval);
    this.resetTimer();
  }

  private autoLogout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/admin/login']),
      error: () => this.router.navigate(['/admin/login'])
    });
  }
}