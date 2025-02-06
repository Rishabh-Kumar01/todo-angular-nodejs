import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthState {
  token: string | null;
  username: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  // Inline initialization using values from localStorage.
  private authSubject = new BehaviorSubject<AuthState>({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  });

  auth$ = this.authSubject.asObservable();

  setAuth(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.authSubject.next({ token, username });
  }

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authSubject.next({ token: null, username: null });
  }
}
