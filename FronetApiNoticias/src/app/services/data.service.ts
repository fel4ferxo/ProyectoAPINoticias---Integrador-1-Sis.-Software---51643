
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { News } from '../news/news.component';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new ReplaySubject<News[]>(1);
  data$ = this.dataSource.asObservable();

  setData(data: News[]){
    console.log('Verificacion servicio', data)
    this.dataSource.next(data);
  }
  constructor() { }
}
