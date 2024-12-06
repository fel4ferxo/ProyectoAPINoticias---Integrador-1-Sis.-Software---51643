import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Noticia {
  categoria: string;
  portal: string;
  titular: string;
  subtitulo?: string;
  nombreAutor?: string;
  fechaPublicacion: string;
  imagen?: string;
  contenido: string;
  urlNoticia: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private apiUrl = 'https://responsible-perfection-apinoticia1.up.railway.app'; // URL de tu backend

  constructor(private http: HttpClient) {}

  /**
   * Crear una nueva noticia
   * @param noticia Datos de la nueva noticia
   * @returns Observable con el ID generado
   */
  createNoticia(noticia: Noticia): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<number>(`${this.apiUrl}/noticias`, noticia, { headers });
  }
}
