import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service.js';
import { TodoStoreService } from '../../store/todo-store.service.js';
import { Todo } from '../../models/todo.model.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  title: string = '';

  constructor(
    private todoService: TodoService,
    private todoStore: TodoStoreService
  ) {}

  addTodo(): void {
    if (!this.title.trim()) { return; }
    const newTodo: Partial<Todo> = { title: this.title, completed: false };
    this.todoService.addTodo(newTodo).subscribe(todo => {
      this.todoStore.addTodo(todo);
      this.title = '';  // reset input after adding
    });
  }
}
