import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';
import { RegistroMedico } from '../../models/registro-medico.model';

@Component({
  selector: 'app-consulta-publica',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink],
  template: `
    <div class="consulta-container">
      <!-- Botão de Acesso Administrativo no Topo -->
      <div class="admin-access-header">
        <button type="button" routerLink="/login" class="btn-admin-nav">
          <span>Login</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
          </svg>
        </button>
      </div>

      <!-- Cabeçalho Institucional -->
      <div class="header-portal">
        <div class="logo-placeholder">
          <!-- Ícone vetorial estilizado (Bastão de Esculápio moderno minimalista) -->
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
        <p class="subtitle">Validador de Situação Cadastral do Médico</p>
      </div>

      <!-- Card de Busca (Vidro Fumê + Borda de Aço) -->
      <div class="search-card">
        <form (ngSubmit)="consultar()" #searchForm="ngForm">
          <div class="input-group">
            <label for="crm-input">Número do CRM do Médico</label>
            <div class="input-wrapper">
              <input
                id="crm-input"
                name="crm"
                type="text"
                required
                placeholder="Ex: 123456"
                [(ngModel)]="crmSearch"
                [disabled]="carregando"
                autocomplete="off"
              />
              <button type="submit" [disabled]="!crmSearch.trim() || carregando" class="btn-search">
                @if (carregando) {
                  <span class="spinner"></span>
                } @else {
                  <span>Consultar</span>
                }
              </button>
            </div>
          </div>
        </form>
        <p class="search-hint">Simulação de consulta pública. CRMs em banco: <strong>123456</strong>, <strong>654321</strong>, <strong>987654</strong></p>
      </div>

      <!-- Estados de Feedback (Carregamento, Sucesso e Erro) -->
      @if (erro) {
        <div class="feedback-card error-card fade-in">
          <div class="error-icon">⚠</div>
          <div class="error-message">
            <h3>Médico não localizado</h3>
            <p>{{ erro }}</p>
          </div>
        </div>
      }

      @if (medico) {
        <div class="feedback-card success-card fade-in">
          <div class="status-badge-container">
            <span class="status-badge" [ngClass]="medico.status.toLowerCase()">
              {{ medico.status }}
            </span>
          </div>
          
          <div class="medico-details">
            <div class="detail-row name-row">
              <span class="label">MÉDICO(A)</span>
              <span class="value-name">{{ medico.nome }}</span>
            </div>

            <div class="details-grid">
              <div class="detail-row">
                <span class="label">CRM / UF</span>
                <span class="value">{{ medico.numeroCrm }} / {{ medico.uf }}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">ESPECIALIDADE</span>
                <span class="value">{{ medico.especialidade || 'Clínico Geral' }}</span>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <span class="footer-timestamp">Consulta autenticada e atualizada pelo CFM</span>
          </div>
        </div>
      }

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

    .consulta-container {
      width: 100%;
      max-width: 520px;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: relative;
    }

    /* Cabeçalho */
    .header-portal {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-placeholder {
      background: rgba(30, 30, 30, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.05);
    }

    .header-portal h1 {
      color: #e0e0e0;
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      margin: 0;
    }

    .admin-access-header {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      z-index: 10;
    }

    .btn-admin-nav {
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 20px;
      color: #34d399;
      padding: 0.45rem 1.15rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-admin-nav:hover {
      background: rgba(16, 185, 129, 0.18);
      border-color: rgba(16, 185, 129, 0.4);
      color: #10b981;
      transform: translateY(-1px);
    }

    .header-portal .subtitle {
      color: #34d399; /* Verde Sálvia/Menta */
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      margin: 0;
    }

    /* Card de Busca (Vidro Fumê + Aço Escovado) */
    .search-card {
      background: rgba(22, 22, 22, 0.65);
      backdrop-filter: blur(16px) saturate(125%);
      -webkit-backdrop-filter: blur(16px) saturate(125%);
      border: 1px solid rgba(255, 255, 255, 0.08); /* Borda Aço sutil */
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 8px 32px 0 rgba(0, 0, 0, 0.4);
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-group label {
      color: #9e9e9e;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .input-wrapper {
      display: flex;
      gap: 0.75rem;
      position: relative;
    }

    .input-wrapper input {
      flex: 1;
      background: rgba(10, 10, 10, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s ease;
    }

    .input-wrapper input:focus {
      border-color: #10b981; /* Verde em foco */
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }

    /* Botão de Busca */
    .btn-search {
      background: linear-gradient(135deg, #059669 0%, #064e3b 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      color: #e6f4ea;
      font-weight: 600;
      padding: 0 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      min-width: 120px;
    }

    .btn-search:hover:not(:disabled) {
      background: linear-gradient(135deg, #10b981 0%, #047857 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
    }

    .btn-search:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Cards de Feedback (Resultado / Erro) */
    .feedback-card {
      background: rgba(22, 22, 22, 0.8);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 12px 40px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .error-card {
      flex-direction: row;
      align-items: flex-start;
      gap: 1rem;
      border-left: 4px solid #c62828;
    }

    .error-icon {
      color: #e57373;
      font-size: 1.5rem;
      line-height: 1;
    }

    .error-message h3 {
      color: #e57373;
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .error-message p {
      color: #b0bec5;
      margin: 0;
      font-size: 0.875rem;
    }

    .success-card {
      position: relative;
    }

    .status-badge-container {
      display: flex;
      justify-content: flex-end;
    }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      text-transform: uppercase;
    }

    .status-badge.ativo {
      background: rgba(46, 125, 50, 0.15);
      color: #81c784;
      border: 1px solid rgba(129, 199, 132, 0.3);
    }

    .status-badge.inativo {
      background: rgba(239, 108, 0, 0.15);
      color: #ffb74d;
      border: 1px solid rgba(255, 183, 77, 0.3);
    }

    .status-badge.cassado {
      background: rgba(198, 40, 40, 0.15);
      color: #e57373;
      border: 1px solid rgba(229, 115, 115, 0.3);
    }

    .medico-details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .detail-row {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .detail-row .label {
      color: #757575;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .detail-row .value-name {
      color: #ffffff;
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 1rem;
    }

    .detail-row .value {
      color: #e0e0e0;
      font-size: 0.95rem;
      font-weight: 500;
    }

    .card-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 0.75rem;
      display: flex;
      justify-content: center;
    }

    .footer-timestamp {
      color: #546e7a;
      font-size: 0.6875rem;
      letter-spacing: 0.02em;
    }

    /* Animações e Loading */
    .fade-in {
      animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
    }

    .search-hint {
      margin-top: 1.25rem;
      font-size: 0.75rem;
      color: #64748b;
      text-align: center;
      line-height: 1.5;
    }

    .search-hint strong {
      color: #10b981;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ConsultaPublicaComponent {
  crmSearch = '';
  carregando = false;
  medico: RegistroMedico | null = null;
  erro = '';

  constructor(
    private consultaService: ConsultaService,
    private cdr: ChangeDetectorRef
  ) { }

  consultar() {
    if (!this.crmSearch) return;
    this.carregando = true;

    this.consultaService.consultarCrm(this.crmSearch).subscribe({
      next: (res) => {
        this.medico = res;
        this.erro = '';
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.medico = null;
        this.erro = 'Registro não encontrado ou inativo.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
