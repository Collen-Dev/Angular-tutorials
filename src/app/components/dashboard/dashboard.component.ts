import { Component, Inject } from '@angular/core';
import {RouterOutlet, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { InactivityService } from '../../services/inactivity.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true
})
export class DashboardComponent {

  mainContentId = 'dashboard-content';
  originalDisplay: string | null = null;

   private inactivity = Inject(InactivityService);

  hideMainMenu(id: string) {
    const element = document.getElementById(id);
    if (element) {
      this.originalDisplay = window.getComputedStyle(element).display;
      element.style.display = 'none';
      this.showMenuContent()
    }
  }

  showMainMenu(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = this.originalDisplay || 'block';
      this.hideMenuContent()
    }
  }

  hideMenuContent() {
    const element = document.getElementById(this.mainContentId);
    if (element) {
      this.originalDisplay = window.getComputedStyle(element).display;
      element.style.display = 'none';
    }
  }

  showMenuContent() {
    const element = document.getElementById(this.mainContentId);
    if (element) {
      element.style.display = this.originalDisplay || 'block';
    }
  }
}
