import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model.js';
import { TodoStoreService } from '../../store/todo-store.service.js';
import { TodoService } from '../../services/todo.service.js';
import { TodoItemComponent } from '../todo-item/todo-item.component.js';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service.js';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoStore: TodoStoreService,
    private todoService: TodoService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.todoStore.todos$.subscribe((todos) => (this.todos = todos));
    this.todoService.getTodos().subscribe({
      next: (res) => {
        this.todoStore.setTodos(res.data!);
        const message = res.message?.trim() || 'Todos fetched successfully';
        this.toastService.showSuccess(message);
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to fetch todos';
        this.toastService.showError(errorMsg);
      },
    });
  }

  onToggle(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: (res) => {
        this.todoStore.updateTodo(res.data!);
        const message = res.message?.trim() || 'Todo updated successfully';
        this.toastService.showSuccess(message);
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to update todo';
        this.toastService.showError(errorMsg);
      },
    });
  }

  onDelete(todoId: string): void {
    this.todoService.deleteTodo(todoId).subscribe({
      next: (res) => {
        this.todoStore.removeTodo(todoId);
        // For delete, the response only contains success and message.
        const message = res.message?.trim() || 'Todo deleted successfully';
        this.toastService.showSuccess(message);
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to delete todo';
        this.toastService.showError(errorMsg);
      },
    });
  }
}
