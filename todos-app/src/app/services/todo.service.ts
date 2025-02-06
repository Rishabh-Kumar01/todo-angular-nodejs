import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  // Helper method to get the Authorization header
  private getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getTodos(): Observable<ApiResponse<Todo[]>> {
    const headers = this.getAuthHeaders();
    return this.http.get<ApiResponse<Todo[]>>(this.baseUrl, { headers });
  }

  addTodo(todo: Partial<Todo>): Observable<ApiResponse<Todo>> {
    const headers = this.getAuthHeaders();
    return this.http.post<ApiResponse<Todo>>(this.baseUrl, todo, { headers });
  }

  updateTodo(todo: Todo): Observable<ApiResponse<Todo>> {
    const headers = this.getAuthHeaders();
    return this.http.patch<ApiResponse<Todo>>(
      `${this.baseUrl}/${todo._id}`,
      todo,
      { headers }
    );
  }

  deleteTodo(todoId: string): Observable<ApiResponse<null>> {
    const headers = this.getAuthHeaders();
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${todoId}`, {
      headers,
    });
  }
}
