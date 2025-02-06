import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Todo } from '../../models/todo.model.js';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ModalInjector } from '../../utils/modal-injector.js';
import { ComponentPortal } from '@angular/cdk/portal';
import { EditTodoModalComponent } from '../edit-todo-modal/edit-todo-modal.component.js';

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

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  toggleCompleted(): void {
    this.toggle.emit({ ...this.todo, completed: !this.todo.completed });
  }

  deleteTodo(): void {
    this.delete.emit(this.todo._id);
  }

  openEditModal(): void {
    const overlayRef: OverlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    // Define a function to close the modal (dispose the overlay)
    const closeFn = () => overlayRef.dispose();

    // Create a custom injector to pass the todo data and close function to the modal
    const injector = new ModalInjector(
      this.todo,
      closeFn,
      this.viewContainerRef.injector
    );

    // Create a portal for the EditTodoModalComponent
    const portal = new ComponentPortal(
      EditTodoModalComponent,
      this.viewContainerRef,
      injector
    );
    overlayRef.attach(portal);

    // Also close the modal when clicking the backdrop
    overlayRef.backdropClick().subscribe(() => closeFn());
  }
}
