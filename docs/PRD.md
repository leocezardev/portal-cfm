PRD: Validador de Situação Cadastral (CRM)

Visão Geral:

- Aplicação full stack contendo um portal de consulta pública de registros médicos e um painel administrativo restrito para gestão dos dados.

Arquitetura:

- Spring Boot REST API + Angular SPA + Autenticação JWT.

Design System: 

- Interface minimalista, com fundo predominantemente dark (aplicando tons de concreto e aço escovado) para transmitir a sobriedade e o peso institucional exigidos pelo CFM, mantendo um visual de alta performance.

Modelagem de Dados (JPA):

- UsuarioAdmin: id, login, senha (hasheada via BCrypt).

- RegistroMedico: id, nome, numeroCrm, uf, especialidade, status (ATIVO, INATIVO, CASSADO).

Endpoints Principais (Spring Boot):

- POST /api/auth/login: Recebe credenciais, retorna token JWT.

- GET /api/medicos/consulta/{crm}: Rota pública para a busca de cidadãos.

- POST /api/medicos: Rota privada (exige JWT). Cadastra um novo médico.

- PUT /api/medicos/{id}/status: Rota privada. Altera a situação cadastral.

Interface (Angular):

- Consulta Pública: Input centralizado de alta conversão para digitar o CRM. Retorna um card com o status legal do médico.

- Acesso Admin: Formulário de login isolado.

- Painel de Controle: Data table (CRUD) para gerenciar as entidades médicas e atualizar os status de fiscalização.