import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <!-- Logo CFM / Título -->
      <div class="header-login">
        <div class="logo-wrapper">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V22" stroke="url(#medicine-gradient)" stroke-width="2" stroke-linecap="round"/>
            <path d="M8 7C9.5 5 11 4.5 12 6C13.5 8 10.5 10 12 12C13.5 14 15.5 13.5 14 16.5C12.5 19 11 18.5 10 20" stroke="url(#metal-gradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="medicine-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#064e3b" />
              </linearGradient>
              <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#cfd8dc" />
                <stop offset="100%" stop-color="#78909c" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2>ÁREA ADMINISTRATIVA</h2>
        <p class="subtitle">Acesso restrito para gerenciamento cadastral</p>
      </div>

      <!-- Card de Formulário (Vidro Fumê + Aço Escovado) -->
      <div class="login-card">
        <form (ngSubmit)="efetuarLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Usuário</label>
            <input
              id="username"
              name="login"
              type="text"
              required
              placeholder="Digite seu usuário"
              [(ngModel)]="usuario"
              [disabled]="carregando"
              autocomplete="username"
            />
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <input
              id="password"
              name="senha"
              type="password"
              required
              placeholder="Digite sua senha"
              [(ngModel)]="senha"
              [disabled]="carregando"
              autocomplete="current-password"
            />
          </div>

          <!-- Feedbacks de erro e sucesso -->
          @if (erro) {
            <div class="feedback error-box fade-in">
              <span class="icon">⚠</span>
              <p>{{ erro }}</p>
            </div>
          }

          @if (sucesso) {
            <div class="feedback success-box fade-in">
              <span class="icon">✓</span>
              <p>Autenticação realizada. Redirecionando...</p>
            </div>
          }

          <button type="submit" [disabled]="!loginForm.valid || carregando || sucesso" class="btn-login">
            @if (carregando) {
              <span class="spinner"></span>
            } @else {
              <span>Entrar</span>
            }
          </button>
        </form>
        <p class="login-hint">Acesso administrativo de fiscalização. Credenciais de teste: <strong>admin</strong> / <strong>admin123</strong></p>
      </div>

      <div class="footer-login">
        <a (click)="voltarConsulta()" class="back-link">← Voltar para Consulta Pública</a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      width: 100%;
    }

    .login-container {
      width: 100%;
      max-width: 420px;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* Cabeçalho */
    .header-login {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-wrapper {
      background: rgba(30, 30, 30, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.05);
    }

    .header-login h2 {
      color: #e0e0e0;
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      margin: 0;
    }

    .header-login .subtitle {
      color: #34d399; /* Verde Sálvia/Menta */
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.03em;
      margin: 0;
    }

    /* Card (Vidro Fumê + Aço) */
    .login-card {
      background: rgba(22, 22, 22, 0.65);
      backdrop-filter: blur(16px) saturate(125%);
      -webkit-backdrop-filter: blur(16px) saturate(125%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 2rem 1.5rem;
      box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 8px 32px 0 rgba(0, 0, 0, 0.4);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      color: #9e9e9e;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .form-group input {
      background: rgba(10, 10, 10, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: #fff;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.3s ease;
    }

    .form-group input:focus {
      border-color: #10b981; /* Verde */
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    /* Botão */
    .btn-login {
      background: linear-gradient(135deg, #059669 0%, #064e3b 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      color: #e6f4ea;
      font-weight: 600;
      padding: 0.85rem 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      margin-top: 0.5rem;
    }

    .btn-login:hover:not(:disabled) {
      background: linear-gradient(135deg, #10b981 0%, #047857 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
    }

    .btn-login:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Feedbacks */
    .feedback {
      border-radius: 8px;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-size: 0.875rem;
    }

    .error-box {
      background: rgba(198, 40, 40, 0.12);
      border: 1px solid rgba(229, 115, 115, 0.25);
      border-left: 4px solid #c62828;
      color: #e57373;
    }

    .success-box {
      background: rgba(46, 125, 50, 0.12);
      border: 1px solid rgba(129, 199, 132, 0.25);
      border-left: 4px solid #2e7d32;
      color: #81c784;
    }

    .feedback p {
      margin: 0;
    }

    .footer-login {
      text-align: center;
    }

    .back-link {
      color: #757575;
      font-size: 0.875rem;
      cursor: pointer;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .back-link:hover {
      color: #10b981;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
    }

    .login-hint {
      margin-top: 1.25rem;
      font-size: 0.75rem;
      color: #64748b;
      text-align: center;
      line-height: 1.5;
    }

    .login-hint strong {
      color: #10b981;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .fade-in {
      animation: fadeIn 0.3s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent {
  usuario = '';
  senha = '';
  carregando = false;
  erro: string | null = null;
  sucesso = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  efetuarLogin() {
    if (!this.usuario.trim() || !this.senha.trim()) return;

    this.carregando = true;
    this.erro = null;
    this.sucesso = false;

    this.authService.login(this.usuario, this.senha)
      .subscribe({
        next: (res: any) => {
          const token = res.token || res.jwt;
          if (token) {
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('jwt_token', token);
            }
            this.sucesso = true;
            this.carregando = false;
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 100);
          } else {
            this.erro = 'Erro: Token nulo na resposta';
            this.carregando = false;
          }
        },
        error: (err) => {
          this.carregando = false;
          if (err.status === 401) {
            this.erro = 'Usuário ou senha inválidos.';
          } else {
            this.erro = 'Erro de comunicação com o servidor. Tente novamente.';
          }
        }
      });
  }

  voltarConsulta() {
    this.router.navigate(['/']);
  }
}
