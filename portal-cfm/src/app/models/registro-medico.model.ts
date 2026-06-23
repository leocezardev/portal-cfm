export interface RegistroMedico {
  id?: number;
  nome: string;
  numeroCrm: string;
  uf: string;
  especialidade: string;
  status: 'ATIVO' | 'INATIVO' | 'CASSADO';
}
