import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthStoreService } from '../../store/auth-store.service';
import { ToastService } from '../../services/toast.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <h2>Signup</h2>
    <form (ngSubmit)="signup()">
      <input
        type="text"
        [(ngModel)]="username"
        name="username"
        placeholder="Username"
        required
      />
      <input
        type="password"
        [(ngModel)]="password"
        name="password"
        placeholder="Password"
        required
      />
      <button type="submit">Signup</button>
    </form>
    <p>Already have an account? <a routerLink="/login">Login</a></p>
  `,
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private authStore: AuthStoreService,
    private toastService: ToastService,
    private router: Router
  ) {}

  signup(): void {
    this.authService
      .signup({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          const message = res.message?.trim() || 'Signup successful';
          this.toastService.showSuccess(message);
          if (res.success && res.data) {
            this.authStore.setAuth(res.data.token, this.username);
            this.router.navigate(['/todos']);
          }
        },
        error: (err) => {
          const errorMsg = err.error.message?.trim() || 'Signup failed';
          this.toastService.showError(errorMsg);
        },
      });
  }
}
