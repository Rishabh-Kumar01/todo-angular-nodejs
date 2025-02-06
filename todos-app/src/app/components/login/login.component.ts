import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthStoreService } from '../../store/auth-store.service';
import { ToastService } from '../../services/toast.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
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
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a routerLink="/signup">Signup</a></p>
  `,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private authStore: AuthStoreService,
    private toastService: ToastService,
    private router: Router
  ) {}

  login(): void {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          const message = res.message?.trim() || 'Login successful';
          this.toastService.showSuccess(message);
          if (res.success && res.data) {
            this.authStore.setAuth(res.data.token, this.username);
            this.router.navigate(['/todos']);
          }
        },
        error: (err) => {
          const errorMsg = err.error.message?.trim() || 'Login failed';
          this.toastService.showError(errorMsg);
        },
      });
  }
}
