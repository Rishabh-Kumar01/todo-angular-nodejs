import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface User {
  _id: string;
  username: string;
  isActive: boolean;
  // additional fields if needed
}

@Injectable({
  providedIn: 'root',
})
export class SuperUserService {
  // Adjust the baseUrl to match your backend route for super user endpoints.
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Helper method to get the Authorization header.
  private getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  getNonSuperUsers(): Observable<ApiResponse<User[]>> {
    const headers = this.getAuthHeaders();
    return this.http.get<ApiResponse<User[]>>(
      `${this.baseUrl}/non-super-users`,
      { headers }
    );
  }

  toggleUserActiveStatus(userId: string): Observable<ApiResponse<User>> {
    const headers = this.getAuthHeaders();
    return this.http.patch<ApiResponse<User>>(
      `${this.baseUrl}/toggle-status/${userId}`,
      {},
      { headers }
    );
  }

  deleteUserById(userId: string): Observable<ApiResponse<null>> {
    const headers = this.getAuthHeaders();
    return this.http.delete<ApiResponse<null>>(
      `${this.baseUrl}/delete/${userId}`,
      { headers }
    );
  }
}
