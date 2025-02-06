import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container">
      <h1>Welcome</h1>
      <button (click)="navigateTo('login')">Login</button>
      <button (click)="navigateTo('signup')">SignUp</button>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate(['/' + route]);
  }
}
