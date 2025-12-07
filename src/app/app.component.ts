import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {NavBarComponent} from './components/nav-bar/nav-bar.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'CT Business';
}
