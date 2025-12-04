import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private http = inject(HttpClient);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone({ withCredentials: true });

    return next.handle(cloned).pipe(
      catchError(err => {
        if (err.status === 401) {

          return this.http.post('/auth/refresh', {}, { withCredentials: true })
            .pipe(
              switchMap(() => next.handle(cloned)),
              catchError(() => throwError(() => err))
            );
        }

        return throwError(() => err);
      })
    );
  }
}
