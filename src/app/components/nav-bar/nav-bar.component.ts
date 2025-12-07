import { Component, OnInit } from '@angular/core'
import {inject} from '@angular/core'
import { HttpErrorResponse } from "@angular/common/http"
import { RouterModule, Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  router = inject(Router)
  private auth = inject(AuthService)
  showNavbar = true;

  ngOnInit(): void {
    // Optional: subscribe to route changes to dynamically show/hide navbar
    this.router.events.subscribe(() => {
      //alert('Url = '+ this.router.url)
      this.showNavbar = this.router.url !== '/admin/login';
    });
  }

    onLogout() {
  this.auth.logout().subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err: HttpErrorResponse) => {
          console.error(err); 
        }
      });
}
}
