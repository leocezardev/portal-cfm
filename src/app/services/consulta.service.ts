import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroMedico } from '../models/registro-medico.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private readonly apiUrl = `${environment.apiUrl}/api/medicos/consulta`;
  private readonly listUrl = `${environment.apiUrl}/api/medicos`;

  constructor(private http: HttpClient) {}

  consultarCrm(crm: string): Observable<RegistroMedico> {
    return this.http.get<RegistroMedico>(`${this.apiUrl}/${crm}`);
  }

  listarTodos(): Observable<RegistroMedico[]> {
    return this.http.get<RegistroMedico[]>(this.listUrl);
  }

  cadastrarMedico(medico: RegistroMedico): Observable<RegistroMedico> {
    return this.http.post<RegistroMedico>(this.listUrl, medico);
  }

  deletarMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.listUrl}/${id}`);
  }
}
