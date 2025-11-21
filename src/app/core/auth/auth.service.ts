// src/app/core/auth/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/auth`;

  // Reactive State
  readonly currentUser = signal<AuthResponse | null>(this.loadUserFromStorage());
  readonly isAuthenticated = signal<boolean>(!!this.currentUser());

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.handleAuthSuccess(response))
    );
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('auth_session');
    // Optional: Call backend logout endpoint
  }

  private handleAuthSuccess(response: AuthResponse) {
    this.currentUser.set(response);
    this.isAuthenticated.set(true);
    localStorage.setItem('auth_session', JSON.stringify(response));
  }

  private loadUserFromStorage(): AuthResponse | null {
    const data = localStorage.getItem('auth_session');
    return data ? JSON.parse(data) : null;
  }

  getAccessToken(): string | undefined {
    return this.currentUser()?.accessToken;
  }
}
