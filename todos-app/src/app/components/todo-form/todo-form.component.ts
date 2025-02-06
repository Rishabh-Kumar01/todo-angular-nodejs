import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service.js';
import { TodoStoreService } from '../../store/todo-store.service.js';
import { Todo } from '../../models/todo.model.js';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service.js';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  title: string = '';

  constructor(
    private todoService: TodoService,
    private todoStore: TodoStoreService,
    private toastService: ToastService
  ) {}

  addTodo(): void {
    if (!this.title.trim()) {
      return;
    }
    const newTodo: Partial<Todo> = { title: this.title, completed: false };
    this.todoService.addTodo(newTodo).subscribe({
      next: (res) => {
        this.todoStore.addTodo(res.data!);
        const message = res.message?.trim() || 'Todo added successfully';
        this.toastService.showSuccess(message);
        this.title = '';
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to add todo';
        this.toastService.showError(errorMsg);
      },
    });
  }
}
