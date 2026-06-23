import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroMedico } from '../models/registro-medico.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'https://portal-cfm.onrender.com/api';

  constructor(private http: HttpClient) {}

  consultarCrm(crm: string): Observable<RegistroMedico> {
    return this.http.get<RegistroMedico>(`${this.apiUrl}/medicos/consulta/${crm}`);
  }

  listarTodos(): Observable<RegistroMedico[]> {
    return this.http.get<RegistroMedico[]>(`${this.apiUrl}/medicos`);
  }

  cadastrarMedico(medico: RegistroMedico): Observable<RegistroMedico> {
    return this.http.post<RegistroMedico>(`${this.apiUrl}/medicos`, medico);
  }

  deletarMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicos/${id}`);
  }
}
