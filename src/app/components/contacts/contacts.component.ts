import { Component } from '@angular/core';

import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  standalone: true
})
export class ContactsComponent {
  contactEmail = 'support@myapp.com';
}
