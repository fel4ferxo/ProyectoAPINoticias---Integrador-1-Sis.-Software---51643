import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timeline } from '../overview/overview.component';

@Injectable({
  providedIn: 'root'
})
export class LineaTiempoService {

  private apiUrl = 'https://responsible-perfection-apinoticia1.up.railway.app'; // URL del backend

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las líneas de tiempo.
   * @returns Observable con la lista de líneas de tiempo.
   */
  getAllLineasTiempo(): Observable<Timeline[]> {
    return this.http.get<Timeline[]>(`${this.apiUrl}/lineas-tiempo`);
  }
}
