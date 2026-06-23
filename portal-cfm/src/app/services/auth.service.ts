import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${environment.apiUrl}/api/auth/login`;
  private readonly TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(login: string, senha: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.authUrl, { login, senha })
      .pipe(
        tap(response => {
          this.saveToken(response.token);
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    // Como estamos rodando com SSR (Server-Side Rendering), o localStorage pode não existir no servidor.
    // Verificamos se estamos no ambiente do navegador antes de acessar o localStorage.
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
