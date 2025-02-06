import { Component, OnInit } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component.js';
import { TodoListComponent } from '../todo-list/todo-list.component.js';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../store/auth-store.service.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-page',
  imports: [TodoFormComponent, TodoListComponent, CommonModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent implements OnInit {
  auth$!: Observable<{ token: string | null; username: string | null }>;

  constructor(private authStore: AuthStoreService, private router: Router) {}

  ngOnInit(): void {
    this.auth$ = this.authStore.auth$;
  }

  logout(): void {
    this.authStore.clearAuth();
    this.router.navigate(['/']);
  }
}
