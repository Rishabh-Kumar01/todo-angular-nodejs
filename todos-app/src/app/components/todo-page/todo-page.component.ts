import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component.js';
import { TodoListComponent } from '../todo-list/todo-list.component.js';

@Component({
  selector: 'app-todo-page',
  imports: [TodoFormComponent, TodoListComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent {}
