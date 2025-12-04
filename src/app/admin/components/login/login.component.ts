import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import {ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule ],
  styleUrl: './login.component.css',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  private auth = inject(AuthService);
  private router = inject(Router);
  showLoginError = false;

  onLoginError(): void {
    this.showLoginError = true;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // call your API here
      this.auth.login(this.email.value?? '', this.password.value?? '').subscribe({
        next: () => this.router.navigate(['/admin/dashboard']),
        error: () => {
          this.onLoginError();
        }
      });
            
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}

