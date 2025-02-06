import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model.js';
import { TodoStoreService } from '../../store/todo-store.service.js';
import { TodoService } from '../../services/todo.service.js';
import { TodoItemComponent } from '../todo-item/todo-item.component.js';
import { CommonModule } from '@angular/common';

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
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    // Subscribe to the global store for real-time updates.
    this.todoStore.todos$.subscribe((todos) => (this.todos = todos));
    // Initial load of todos from the backend.
    this.todoService.getTodos().subscribe((data) => {
      this.todoStore.setTodos(data);
    });
  }

  onToggle(updatedTodo: Todo): void {
    // Update todo in the backend then update the global store.
    this.todoService.updateTodo(updatedTodo).subscribe((todo) => {
      this.todoStore.updateTodo(todo);
    });
  }

  onDelete(todoId: string): void {
    // Delete todo from backend then update the global store.
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.todoStore.removeTodo(todoId);
    });
  }
}
