import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoStoreService } from '../../store/todo-store.service';
import { TODO_DATA, CLOSE_FN } from '../../utils/modal-injector';
import { ToastService } from '../../services/toast.service.js';

@Component({
  selector: 'app-edit-todo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal">
      <h2>Edit Todo Title</h2>
      <input type="text" [(ngModel)]="title" />
      <div class="buttons">
        <button (click)="update()">Update</button>
        <button (click)="close()">Cancel</button>
      </div>
    </div>
  `,
  styleUrl: './edit-todo-modal.component.css',
})
export class EditTodoModalComponent implements OnInit {
  title: string = '';

  constructor(
    @Inject(TODO_DATA) public todo: Todo,
    @Inject(CLOSE_FN) public closeFn: () => void,
    private todoService: TodoService,
    private todoStore: TodoStoreService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.title = this.todo.title;
  }

  update(): void {
    const updatedTodo = { ...this.todo, title: this.title };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: (res) => {
        this.todoStore.updateTodo(res.data!);
        const message = res.message?.trim() || 'Todo updated successfully';
        this.toastService.showSuccess(message);
        this.close();
      },
      error: (err) => {
        const errorMsg = err.error.message?.trim() || 'Failed to update todo';
        this.toastService.showError(errorMsg);
      },
    });
  }

  close(): void {
    this.closeFn();
  }
}
