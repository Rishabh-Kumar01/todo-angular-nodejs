import { Injector, InjectionToken } from '@angular/core';
import { Todo } from '../models/todo.model';

export const TODO_DATA = new InjectionToken<Todo>('todo');
export const CLOSE_FN = new InjectionToken<() => void>('close');

export class ModalInjector implements Injector {
  constructor(
    private todo: Todo,
    private closeFn: () => void,
    private parentInjector: Injector = Injector.NULL
  ) {}

  get<T>(token: any, notFoundValue?: T): T {
    if (token === TODO_DATA) {
      return this.todo as any;
    }
    if (token === CLOSE_FN) {
      return this.closeFn as any;
    }
    return this.parentInjector.get<T>(token, notFoundValue);
  }
}
