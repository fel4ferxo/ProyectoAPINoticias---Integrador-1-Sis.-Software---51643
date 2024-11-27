import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { News } from '../news/news.component';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSources: Map<string, ReplaySubject<News[]>> = new Map();
  private initializationDataSource(id: string): ReplaySubject<News[]>{
    if(!this.dataSources.has(id)){
      this.dataSources.set(id, new ReplaySubject<News[]>(1));
    }
    return this.dataSources.get(id)!;
  }

  setData(id: string, data: News[]): void{
    const dataSource = this.initializationDataSource(id);
    console.log('Verificacion servicio', data, id)
    dataSource.next(data);
  }
  getData(id: string): Observable<News[]> {
    const dataSource = this.initializationDataSource(id);
    return dataSource.asObservable();
  }
  constructor() { }
}
