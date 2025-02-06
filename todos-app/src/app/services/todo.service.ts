import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T; // Present for add/update/get calls
  error?: string; // Present for error responses
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ApiResponse<Todo[]>> {
    return this.http.get<ApiResponse<Todo[]>>(this.baseUrl);
  }

  addTodo(todo: Partial<Todo>): Observable<ApiResponse<Todo>> {
    return this.http.post<ApiResponse<Todo>>(this.baseUrl, todo);
  }

  updateTodo(todo: Todo): Observable<ApiResponse<Todo>> {
    return this.http.patch<ApiResponse<Todo>>(
      `${this.baseUrl}/${todo._id}`,
      todo
    );
  }

  deleteTodo(todoId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${todoId}`);
  }
}
