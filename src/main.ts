import { bootstrapApplication } from '@angular/platform-browser';
import { InactivityService } from './app/services/inactivity.service';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

bootstrapApplication(AppComponent, {
  providers: [
    InactivityService,
    provideHttpClient(), // <-- THIS PROVIDES HttpClient
    provideRouter(routes)    // optional, if using routing
  ]
}).catch(err => console.error(err));
