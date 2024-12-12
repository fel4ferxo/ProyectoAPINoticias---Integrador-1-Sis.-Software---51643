import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  name: string;
  apellido_p: string;
  apellido_m: string;
  correo: string;
  telefono: string;
  metodo_pago: string;
  nro_cuenta: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class ValidarUsuarioService {
  private apiUrl = 'https://responsible-perfection-apinoticia1.up.railway.app/validarUsuario';
  private apiurlcre='https://responsible-perfection-apinoticia1.up.railway.app/Usuario';
  private HttpClient=inject(HttpClient);
  constructor(private http: HttpClient) {

   }
  validarUsuario(correo: string, password: string): Observable<any> {
    const body = { correo, password }; // Construir el cuerpo de la solicitud
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.HttpClient.post<any>(this.apiUrl, body,httpOptions); // Realizar la solicitud POST
  }

  createUsuario(newUsuario: Usuario): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiurlcre, newUsuario, httpOptions);
  }
}
