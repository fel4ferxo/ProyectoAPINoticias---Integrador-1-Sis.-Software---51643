import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { News } from '../news/news.component';
import { Usuario } from '../inicio-sesion/inicio-sesion.component';
@Injectable({
  providedIn: 'root'
})

//Este servicio permite la transmición de datos entre componentes. En este caso transporta noticias (News)
export class DataService {
  //Inincialización de la ID del usuario al cual se le buscaran los datos relacionados
  private dataUsuario =  new Subject<Usuario>();
  dataUsuario$ = this.dataUsuario.asObservable();
  //Mapa que guarda la ID de la línea de tiempo a la que se va añadir las noticias, y las noticias a registrar
  private dataSources: Map<string, ReplaySubject<News[]>> = new Map();
  private initializationDataSource(id: string): ReplaySubject<News[]>{
    if(!this.dataSources.has(id)){
      this.dataSources.set(id, new ReplaySubject<News[]>(1));
    }
    return this.dataSources.get(id)!;
  }
  /**
   * 
   * @param { Usuario } usuario - ID del usuario actualmente registrado
   */
  setDataUsuario(usuario: Usuario){
    this.dataUsuario.next(usuario);
  }

  /**
   * Agrega las noticias a ser registradas, esta función es utilizada por otros componentes
   * @param {string} id - ID de la línea de tiempo 
   * @param {News[]} data  - Array de noticias a ser agregadas
   */
  setData(id: string, data: News[]): void{
    const dataSource = this.initializationDataSource(id);
    console.log('Verificacion servicio', data, id)
    dataSource.next(data);
  }
  /**
   * Función que permite recibir los datos pasados, esta función es utilizada por otros componentes
   * @param {string} id - ID de la línea de tiempo
   * @returns {Observable<News[]>} - Observables es una interfaz que permite operaciones asíncronicas.
   */
  getData(id: string): Observable<News[]> {
    const dataSource = this.initializationDataSource(id);
    return dataSource.asObservable();
  }
  constructor() { }
}
