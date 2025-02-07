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
}

export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SuperUserService {
  // Ensure this URL matches your backend routes
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  // Accepts page and limit query parameters
  getNonSuperUsers(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiResponse<{ users: User[]; pagination: Pagination }>> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/non-super-users?page=${page}&limit=${limit}`;
    return this.http.get<
      ApiResponse<{ users: User[]; pagination: Pagination }>
    >(url, { headers });
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
