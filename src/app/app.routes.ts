import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { LoginComponent } from './admin/components/login/login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { AboutComponent } from '../app/components/about/about.component';
import { ContactsComponent } from '../app/components/contacts/contacts.component';
import { ServicesComponent } from '../app/components/services/services.component';
import {authGuard} from './services/auth-guard.service'

export const routes: Routes = [
    // Default route → dashboard
    //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
    // Redirect '/home' to '/dashboard'
    //{ path: 'home', redirectTo: 'dashboard', pathMatch: 'full' },
  
    // Main pages
    { path: 'home', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'contact', component: ContactsComponent },
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  
    // Wildcard route → redirect to dashboard
    { path: '**', redirectTo: 'dashboard' },
  ];