import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model.js';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();

  toggleCompleted(): void {
    // Toggle the completed status and emit updated todo.
    this.toggle.emit({ ...this.todo, completed: !this.todo.completed });
  }

  deleteTodo(): void {
    // Emit the todo ID for deletion.
    this.delete.emit(this.todo._id);
  }
}
