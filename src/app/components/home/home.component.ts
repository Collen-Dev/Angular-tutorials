import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import {Inject} from '@angular/core'

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private router = Inject(Router);
  ngOnInit(): void {
    return;
  }
  
  constructor()
  {
    this.router.navigate(['/dashboard']);
  }
}
