import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = `${environment.apiUrl}`;
  private http = inject(HttpClient);
  private router = inject(Router);

  login(username: string, password: string) {
    return this.http.post(this.apiUrl + 'api/auth/login',
      { username, password },
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post(this.apiUrl + 'api/auth/logout', {}, { withCredentials: true })
  }

  checkAuth() {
    // backend will check access_token cookie
    return this.http.get(this.apiUrl + 'api/auth/check', { withCredentials: true });
  }

   refreshToken() {
    return this.http.post(this.apiUrl + 'api/auth/refresh', {}, { withCredentials: true })
  }

}
