import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="portfolio-container">
      <!-- Painel de Portfólio (Showcase) -->
      <aside class="portfolio-panel">
        <div class="panel-header">
          <span class="project-tag">Showcase / Portfólio</span>
          <h2>Projeto Java Full Stack</h2>
          <h2>Validador CFM</h2>
          <div class="author-info">
            <span class="label">Desenvolvedor</span>
            <span class="author-name">Leonardo Cézar</span>
          </div>
        </div>

        <div class="panel-content">
          <p class="context-text">
            Plataforma de homologação desenvolvida para demonstrar o consumo de APIs REST protegidas, injeção de dependências e controle de estado reativo.
          </p>

          <div class="tech-stack">
            <span class="section-title">Tech Stack</span>
            <div class="badges-container">
              <div class="tech-badge angular" title="Angular 17+">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 20H5.5L12 6L18.5 20H22L12 2Z" fill="url(#angular-grad-sidebar)"/>
                  <path d="M12 8.5L7.5 17.5H16.5L12 8.5ZM12 11.5L14.5 16.5H9.5L12 11.5Z" fill="#fff" opacity="0.9"/>
                  <defs>
                    <linearGradient id="angular-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#E11270" />
                      <stop offset="100%" stop-color="#FD5E3A" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Angular 17+</span>
              </div>

              <div class="tech-badge springboot" title="Spring Boot 3">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 19 17 19 11C19 6 15 2 12 2C9 2 5 6 5 11C5 17 12 22 12 22Z" fill="url(#spring-grad-sidebar)"/>
                  <path d="M12 22V8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M12 13C12 13 15 12 16 9" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M12 17C12 17 9 16 8 13" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="spring-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#6DB33F" />
                      <stop offset="100%" stop-color="#34720D" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Spring Boot 3</span>
              </div>

              <div class="tech-badge jwt" title="JWT Stateless">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V12C3 17 8 21 12 22C16 21 21 17 21 12V7L12 2Z" stroke="url(#jwt-grad-sidebar)" stroke-width="2" stroke-linejoin="round"/>
                  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="7" font-weight="900" fill="#fff" font-family="'Inter', sans-serif">JWT</text>
                  <defs>
                    <linearGradient id="jwt-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#fb0055" />
                      <stop offset="100%" stop-color="#d635d6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>JWT Stateless</span>
              </div>

              <div class="tech-badge jpa" title="Spring Data JPA">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6C4 3.79086 7.58172 2 12 2C16.4183 2 20 3.79086 20 6M4 6C4 8.20914 7.58172 10 12 10C16.4183 10 20 8.20914 20 6M4 6V18C4 20.2091 7.58172 22 12 22C16.4183 22 20 20.2091 20 18V6" stroke="url(#jpa-grad-sidebar)" stroke-width="2"/>
                  <path d="M4 12C4 14.2091 7.58172 16 12 16C16.4183 16 20 14.2091 20 12" stroke="url(#jpa-grad-sidebar)" stroke-width="2"/>
                  <path d="M12 13V19" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M15 16H9" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="jpa-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#3B82F6" />
                      <stop offset="100%" stop-color="#1D4ED8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Spring Data JPA</span>
              </div>

              <div class="tech-badge vercel" title="Vercel">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 20H22L12 2Z" fill="url(#vercel-grad-sidebar)"/>
                  <defs>
                    <linearGradient id="vercel-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#ffffff" />
                      <stop offset="100%" stop-color="#a3a3a3" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Vercel</span>
              </div>

              <div class="tech-badge supabase" title="Supabase">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.35 2L4 13h7.65L10.65 22 20 11h-7.65L13.35 2z" fill="url(#supabase-grad-sidebar)"/>
                  <defs>
                    <linearGradient id="supabase-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#3ecf8e" />
                      <stop offset="100%" stop-color="#059669" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Supabase</span>
              </div>

              <div class="tech-badge database" title="H2 / PostgreSQL">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6C16.9706 6 21 4.88071 21 3.5C21 2.11929 16.9706 1 12 1C7.02944 1 3 2.11929 3 3.5C3 4.88071 7.02944 6 12 6Z" fill="url(#db2-grad-sidebar)"/>
                  <path d="M3 3.5V9.5C3 10.88 7 12 12 12C17 12 21 10.88 21 9.5V3.5" stroke="url(#db2-grad-sidebar)" stroke-width="2"/>
                  <path d="M3 9.5V15.5C3 16.88 7 18 12 18C17 18 21 16.88 21 15.5V9.5" stroke="url(#db2-grad-sidebar)" stroke-width="2"/>
                  <path d="M3 15.5V20.5C3 21.88 7 23 12 23C17 23 21 21.88 21 20.5V15.5" stroke="url(#db2-grad-sidebar)" stroke-width="2"/>
                  <defs>
                    <linearGradient id="db2-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#336791" />
                      <stop offset="100%" stop-color="#00a2ff" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>H2 / PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Conteúdo da Aplicação -->
      <main class="app-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .portfolio-container {
      display: flex;
      flex-direction: row;
      min-height: 100vh;
      width: 100%;
      background: radial-gradient(circle at center, #111a16 0%, #080d0b 100%);
      overflow-x: hidden;
    }

    .portfolio-panel {
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      width: 360px;
      background: rgba(10, 15, 12, 0.6);
      backdrop-filter: blur(20px) saturate(120%);
      -webkit-backdrop-filter: blur(20px) saturate(120%);
      border-right: 1px solid rgba(16, 185, 129, 0.12);
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      flex-shrink: 0;
      box-shadow: 10px 0 30px rgba(0, 0, 0, 0.4);
    }

    .portfolio-panel::-webkit-scrollbar {
      width: 4px;
    }
    .portfolio-panel::-webkit-scrollbar-track {
      background: transparent;
    }
    .portfolio-panel::-webkit-scrollbar-thumb {
      background: rgba(16, 185, 129, 0.3);
      border-radius: 2px;
    }

    .app-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      overflow-y: auto;
    }

    .project-tag {
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      display: inline-block;
      margin-bottom: 0.75rem;
    }

    .portfolio-panel h2 {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.4;
      margin: 0 0 1.25rem 0;
      letter-spacing: 0.02em;
    }

    .author-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      border-left: 2px solid #10b981;
      padding-left: 0.75rem;
    }

    .author-info .label {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
    }

    .author-info .author-name {
      font-size: 1rem;
      font-weight: 700;
      color: #e2e8f0;
    }

    .panel-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .context-text {
      font-size: 0.875rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0;
    }

    .tech-stack {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #10b981;
    }

    .badges-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.65rem;
    }

    .tech-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
      padding: 0.55rem 0.75rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: default;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tech-badge.database {
      grid-column: span 2;
    }

    .tech-badge svg {
      flex-shrink: 0;
    }

    .tech-badge span {
      line-height: 1;
    }

    .tech-badge:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
    }

    /* Cores de Hover específicas para cada tecnologia na barra lateral */
    .tech-badge.angular:hover {
      border-color: rgba(225, 18, 112, 0.4);
      box-shadow: 0 0 10px rgba(225, 18, 112, 0.15);
    }
    .tech-badge.springboot:hover {
      border-color: rgba(109, 179, 63, 0.4);
      box-shadow: 0 0 10px rgba(109, 179, 63, 0.2);
    }
    .tech-badge.jwt:hover {
      border-color: rgba(214, 53, 214, 0.4);
      box-shadow: 0 0 10px rgba(214, 53, 214, 0.15);
    }
    .tech-badge.jpa:hover {
      border-color: rgba(59, 130, 246, 0.4);
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.15);
    }
    .tech-badge.database:hover {
      border-color: rgba(51, 103, 145, 0.4);
      box-shadow: 0 0 10px rgba(51, 103, 145, 0.2);
    }
    .tech-badge.supabase:hover {
      border-color: rgba(62, 207, 142, 0.4);
      box-shadow: 0 0 10px rgba(62, 207, 142, 0.2);
    }
    .tech-badge.vercel:hover {
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 992px) {
      .portfolio-container {
        flex-direction: column;
      }

      .portfolio-panel {
        position: static;
        height: auto;
        overflow-y: visible;
        width: 100%;
        border-right: none;
        border-bottom: 1px solid rgba(16, 185, 129, 0.12);
        padding: 2rem 1.5rem;
        gap: 1.5rem;
      }

      .panel-content {
        gap: 1.25rem;
      }
    }
  `],
})
export class App { }
