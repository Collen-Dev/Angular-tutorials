import { Component, inject } from '@angular/core';
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'

import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true
})
export class AboutComponent {
  private router = inject(Router);

  goHome() {
    this.router.navigate(['/home']);
  }
}
