import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Adjust the baseUrl according to your backend configuration.
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  signup(credentials: {
    username: string;
    password: string;
  }): Observable<ApiResponse<{ token: string }>> {
    return this.http.post<ApiResponse<{ token: string }>>(
      `${this.baseUrl}/signup`,
      credentials
    );
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<ApiResponse<{ token: string }>> {
    return this.http.post<ApiResponse<{ token: string }>>(
      `${this.baseUrl}/login`,
      credentials
    );
  }
}
