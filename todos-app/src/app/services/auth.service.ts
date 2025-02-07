import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Create an interface to reflect the login response data.
export interface LoginResponseData {
  token: string;
  isSuperUser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Adjust the baseUrl according to your backend.
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  signup(credentials: {
    username: string;
    password: string;
  }): Observable<ApiResponse<LoginResponseData>> {
    return this.http.post<ApiResponse<LoginResponseData>>(
      `${this.baseUrl}/signup`,
      credentials
    );
  }

  // Update the login method to use the LoginResponseData interface.
  login(credentials: {
    username: string;
    password: string;
  }): Observable<ApiResponse<LoginResponseData>> {
    return this.http.post<ApiResponse<LoginResponseData>>(
      `${this.baseUrl}/login`,
      credentials
    );
  }
}
