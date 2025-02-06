import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    const todos = this.http
      .get<{ success: boolean; message: string; data: Todo[] }>(this.baseUrl)
      .pipe(map((response) => response.data));
    console.log('todos', todos);
    return todos;
  }

  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http
      .post<{ data: Todo }>(this.baseUrl, todo)
      .pipe(map((response) => response.data));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .patch<{ data: Todo }>(`${this.baseUrl}/${todo._id}`, todo)
      .pipe(map((response) => response.data));
  }

  deleteTodo(todoId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${todoId}`);
  }
}
