import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthState {
  token: string | null;
  username: string | null;
  isSuperUser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  // Initialize the auth state from localStorage.
  private authSubject = new BehaviorSubject<AuthState>({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    isSuperUser: localStorage.getItem('isSuperUser') === 'true', // Convert string to boolean.
  });

  auth$ = this.authSubject.asObservable();

  setAuth(token: string, username: string, isSuperUser: boolean): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('isSuperUser', isSuperUser.toString());
    this.authSubject.next({ token, username, isSuperUser });
  }

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isSuperUser');
    this.authSubject.next({ token: null, username: null, isSuperUser: false });
  }
}
