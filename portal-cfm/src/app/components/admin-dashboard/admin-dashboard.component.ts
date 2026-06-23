import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { AuthService } from '../../services/auth.service';
import { RegistroMedico } from '../../models/registro-medico.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <!-- Cabeçalho do Painel -->
      <div class="dashboard-header fade-in">
        <div class="header-left">
          <div class="logo-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22" stroke="url(#medicine-grad)" stroke-width="2" stroke-linecap="round"/>
              <path d="M8 7C9.5 5 11 4.5 12 6C13.5 8 10.5 10 12 12C13.5 14 15.5 13.5 14 16.5C12.5 19 11 18.5 10 20" stroke="url(#metal-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="medicine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#10b981" />
                  <stop offset="100%" stop-color="#064e3b" />
                </linearGradient>
                <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#cfd8dc" />
                  <stop offset="100%" stop-color="#78909c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1>PAINEL DE CONTROLE CADASTRAL</h1>
            <p class="subtitle">CFM</p>
          </div>
        </div>
        <button (click)="logout()" class="btn-logout">
          Sair
        </button>
      </div>

      <!-- Card do Grid Principal (Vidro Fumê + Aço Escovado) -->
      <div class="dashboard-card fade-in">
        <div class="card-header">
          <div class="header-title-section">
            <h2>Registros Médicos Cadastrados</h2>
            <span class="badge-count" *ngIf="medicos.length > 0">
              {{ medicos.length }} {{ medicos.length === 1 ? 'médico' : 'médicos' }}
            </span>
          </div>
          <button (click)="exibirFormulario = !exibirFormulario" class="btn-novo-registro">
            {{ exibirFormulario ? 'Cancelar' : 'Novo Registro' }}
          </button>
        </div>

        <!-- Formulário de Cadastro (Ocultável com Animação) -->
        <div class="formulario-cadastro fade-in" *ngIf="exibirFormulario">
          <h3>Cadastrar Novo Registro Médico</h3>
          <form (ngSubmit)="cadastrarMedico()" #cadastroForm="ngForm">
            <div class="form-grid">
              <div class="form-group col-span-2">
                <label for="nome">Nome do Profissional</label>
                <input type="text" id="nome" name="nome" [(ngModel)]="novoMedico.nome" required placeholder="Ex: Dr. João da Silva" autocomplete="off" />
              </div>
              
              <div class="form-group">
                <label for="crm">Número do CRM</label>
                <input type="text" id="crm" name="crm" [(ngModel)]="novoMedico.numeroCrm" required placeholder="Ex: 123456" autocomplete="off" />
              </div>

              <div class="form-group">
                <label for="uf">UF</label>
                <input type="text" id="uf" name="uf" [(ngModel)]="novoMedico.uf" required placeholder="Ex: SP" maxlength="2" class="uppercase" autocomplete="off" />
              </div>

              <div class="form-group col-span-2">
                <label for="especialidade">Especialidade</label>
                <input type="text" id="especialidade" name="especialidade" [(ngModel)]="novoMedico.especialidade" required placeholder="Ex: Cardiologia" autocomplete="off" />
              </div>

              <div class="form-group">
                <label for="status">Status Situacional</label>
                <select id="status" name="status" [(ngModel)]="novoMedico.status" required>
                  <option value="ATIVO">ATIVO</option>
                  <option value="INATIVO">INATIVO</option>
                  <option value="CASSADO">CASSADO</option>
                </select>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" [disabled]="!cadastroForm.form.valid || salvando" class="btn-salvar">
                <span class="spinner-small" *ngIf="salvando"></span>
                {{ salvando ? 'Salvando...' : 'Confirmar Cadastro' }}
              </button>
            </div>
            
            <div class="form-error" *ngIf="cadastroErro">
              <span class="icon">⚠</span>
              <span>{{ cadastroErro }}</span>
            </div>
          </form>
        </div>

        <!-- Feedbacks de erro e carregamento -->
        <div *ngIf="carregando" class="loading-state">
          <div class="spinner"></div>
          <p>Carregando registros do servidor...</p>
        </div>

        <div *ngIf="erro" class="error-box">
          <span class="icon">⚠</span>
          <div class="error-content">
            <p>{{ erro }}</p>
            <button (click)="carregarMedicos()" class="btn-retry">Tentar novamente</button>
          </div>
        </div>

        <!-- Tabela -->
        <div class="table-responsive" *ngIf="!carregando && !erro && medicos.length > 0">
          <table class="modern-table">
            <thead>
              <tr>
                <th>Nome do Profissional</th>
                <th>CRM</th>
                <th>UF</th>
                <th>Especialidade</th>
                <th class="text-center">Status Situacional</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let medico of medicos">
                <td class="col-nome">
                  <div class="avatar-stub">{{ getIniciais(medico.nome) }}</div>
                  <span class="nome-texto">{{ medico.nome }}</span>
                </td>
                <td class="col-crm font-mono">{{ medico.numeroCrm }}</td>
                <td class="col-uf"><span class="uf-tag">{{ medico.uf }}</span></td>
                <td>{{ medico.especialidade }}</td>
                <td class="text-center">
                  <span class="status-badge" [ngClass]="medico.status.toLowerCase()">
                    {{ medico.status }}
                  </span>
                </td>
                <td class="text-center">
                  <button (click)="deletarMedico(medico.id)" class="btn-excluir" title="Excluir Registro">
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="empty-state" *ngIf="!carregando && !erro && medicos.length === 0">
          <span class="empty-icon">📂</span>
          <p>Nenhum registro médico localizado no sistema.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 85vh;
      color: #e0e6ed;
      padding: 2rem 1rem;
    }

    .dashboard-container {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* Cabeçalho do Painel */
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-badge {
      background: rgba(30, 35, 45, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05);
    }

    .dashboard-header h1 {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      margin: 0;
      color: #f5f6f8;
    }

    .dashboard-header .subtitle {
      font-size: 0.8125rem;
      color: #34d399; /* Verde Sálvia/Menta */
      margin: 0;
      font-weight: 500;
    }

    /* Botão Sair */
    .btn-logout {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #c8d6e5;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-logout:hover {
      background: rgba(238, 82, 83, 0.1);
      border-color: rgba(238, 82, 83, 0.4);
      color: #ff6b6b;
      transform: translateY(-1px);
    }

    /* Icone */
    .icon {
      font-family: 'Material Icons', sans-serif;
      font-size: 1.125rem;
    }

    /* Card (Vidro Fumê + Aço Escovado) */
    .dashboard-card {
      background: rgba(18, 22, 28, 0.65);
      backdrop-filter: blur(20px) saturate(140%);
      -webkit-backdrop-filter: blur(20px) saturate(140%);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 12px 40px rgba(0, 0, 0, 0.5);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .card-header h2 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      color: #c8d6e5;
      letter-spacing: 0.02em;
    }

    .badge-count {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #a1b0cb;
    }

    /* Tabela Moderna */
    .table-responsive {
      overflow-x: auto;
    }

    .modern-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .modern-table th {
      background: rgba(10, 12, 16, 0.4);
      padding: 1rem 1.25rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #34d399; /* Verde Sálvia/Menta */
      border-bottom: 2px solid rgba(255, 255, 255, 0.05);
    }

    .modern-table td {
      padding: 1.15rem 1.25rem;
      font-size: 0.9rem;
      color: #cfd8dc;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      vertical-align: middle;
      transition: background 0.2s ease;
    }

    .modern-table tbody tr:hover td {
      background: rgba(255, 255, 255, 0.02);
      color: #fff;
    }

    /* Avatar e Iniciais */
    .col-nome {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar-stub {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #059669 0%, #064e3b 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: #e6f4ea;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .nome-texto {
      font-weight: 500;
    }

    .font-mono {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
    }

    .uf-tag {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #a1b0cb;
    }

    .text-center {
      text-align: center;
    }

    /* Badges de Status (Glow Suave) */
    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.85rem;
      border-radius: 30px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .status-badge.ativo {
      background: rgba(46, 213, 115, 0.12);
      border: 1px solid rgba(46, 213, 115, 0.3);
      color: #2ed573;
    }

    .status-badge.inativo {
      background: rgba(255, 165, 2, 0.12);
      border: 1px solid rgba(255, 165, 2, 0.3);
      color: #ffa502;
    }

    .status-badge.cassado {
      background: rgba(255, 71, 87, 0.12);
      border: 1px solid rgba(255, 71, 87, 0.3);
      color: #ff4757;
    }

    /* Estados Adicionais */
    .loading-state, .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 1.5rem;
      gap: 1rem;
      color: #8a99ad;
      text-align: center;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      border-top-color: #10b981;
      animation: spin 0.8s linear infinite;
    }

    .error-box {
      background: rgba(238, 82, 83, 0.08);
      border: 1px solid rgba(238, 82, 83, 0.2);
      border-left: 4px solid #ee5253;
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      margin: 1rem 0;
    }

    .error-box .icon {
      color: #ff6b6b;
      font-size: 1.5rem;
    }

    .error-content {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    }

    .error-content p {
      margin: 0;
      color: #ff8a8a;
      font-size: 0.9rem;
    }

    .btn-retry, .btn-redirect {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      padding: 0.4rem 0.85rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-retry:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .empty-icon {
      font-size: 2.5rem;
      opacity: 0.6;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Estilos do Formulário */
    .formulario-cadastro {
      background: rgba(10, 15, 12, 0.4);
      border: 1px solid rgba(16, 185, 129, 0.15);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.02);
    }

    .formulario-cadastro h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #34d399;
      margin-top: 0;
      margin-bottom: 1.25rem;
      letter-spacing: 0.02em;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .col-span-2 {
      grid-column: span 2;
    }

    .form-group label {
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .form-group input, .form-group select {
      background: rgba(10, 10, 10, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0.65rem 0.85rem;
      color: #fff;
      font-size: 0.9rem;
      outline: none;
      transition: all 0.3s ease;
    }

    .form-group input:focus, .form-group select:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15);
    }

    .form-group select option {
      background: #0d0d0d;
      color: #fff;
    }

    .uppercase {
      text-transform: uppercase;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 1.25rem;
    }

    .btn-salvar {
      background: linear-gradient(135deg, #10b981 0%, #047857 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      color: #fff;
      font-weight: 600;
      font-size: 0.875rem;
      padding: 0.65rem 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .btn-salvar:hover:not(:disabled) {
      background: linear-gradient(135deg, #34d399 0%, #059669 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    }

    .btn-salvar:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .form-error {
      margin-top: 1rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: #f87171;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Botão Novo Registro */
    .header-title-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .btn-novo-registro {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 8px;
      color: #34d399;
      padding: 0.5rem 1rem;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-novo-registro:hover {
      background: rgba(16, 185, 129, 0.2);
      border-color: rgba(16, 185, 129, 0.4);
      color: #10b981;
      transform: translateY(-1px);
    }

    .spinner-small {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
    }

    /* Botão Excluir */
    .btn-excluir {
      background: rgba(239, 68, 68, 0.05);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: 6px;
      color: #f87171;
      padding: 0.35rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-excluir:hover {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.45);
      color: #ef4444;
      transform: translateY(-1px);
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  medicos: RegistroMedico[] = [];
  carregando = true;
  erro: string | null = null;

  exibirFormulario = false;
  salvando = false;
  cadastroErro: string | null = null;
  novoMedico: Partial<RegistroMedico> = this.inicializarNovoMedico();

  constructor(
    private consultaService: ConsultaService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  inicializarNovoMedico(): Partial<RegistroMedico> {
    return {
      nome: '',
      numeroCrm: '',
      uf: '',
      especialidade: '',
      status: 'ATIVO' as any
    };
  }

  ngOnInit(): void {
    this.carregarMedicos();
  }

  cadastrarMedico(): void {
    if (!this.novoMedico.nome || !this.novoMedico.numeroCrm || !this.novoMedico.uf || !this.novoMedico.status) {
      this.cadastroErro = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    this.salvando = true;
    this.cadastroErro = null;

    if (this.novoMedico.uf) {
      this.novoMedico.uf = this.novoMedico.uf.toUpperCase();
    }

    this.consultaService.cadastrarMedico(this.novoMedico as RegistroMedico).subscribe({
      next: () => {
        this.salvando = false;
        this.exibirFormulario = false;
        this.novoMedico = this.inicializarNovoMedico();
        this.carregarMedicos();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.salvando = false;
        if (err.status === 409) {
          this.cadastroErro = 'CRM já cadastrado no sistema.';
        } else {
          this.cadastroErro = 'Falha ao cadastrar o médico. Verifique os dados inseridos.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  deletarMedico(id?: number): void {
    if (id === undefined) return;
    if (!confirm('Deseja realmente excluir este registro?')) return;

    this.consultaService.deletarMedico(id).subscribe({
      next: () => {
        this.carregarMedicos();
        this.cdr.detectChanges();
      },
      error: (err) => {
        alert('Erro ao excluir o registro médico.');
        this.cdr.detectChanges();
      }
    });
  }

  carregarMedicos(): void {
    this.carregando = true;
    this.erro = null;
    this.cdr.detectChanges();

    this.consultaService.listarTodos().subscribe({
      next: (dados) => {
        this.medicos = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.carregando = false;
        if (err.status === 401 || err.status === 403) {
          this.erro = 'Sessão expirada ou acesso não autorizado. Por favor, faça login novamente.';
          setTimeout(() => {
            this.logout();
          }, 3000);
        } else {
          this.erro = 'Falha ao carregar registros do CFM. Verifique a conexão com a API.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getIniciais(nome: string): string {
    if (!nome) return '';
    const partes = nome.split(' ');
    // Filtra para remover termos como "Dr.", "Dra."
    const palavrasValidas = partes.filter(p => {
      const pLower = p.toLowerCase();
      return pLower !== 'dr.' && pLower !== 'dra.' && pLower !== 'dr' && pLower !== 'dra';
    });

    if (palavrasValidas.length >= 2) {
      return (palavrasValidas[0].charAt(0) + palavrasValidas[1].charAt(0)).toUpperCase();
    }
    return palavrasValidas[0] ? palavrasValidas[0].charAt(0).toUpperCase() : '';
  }
}
