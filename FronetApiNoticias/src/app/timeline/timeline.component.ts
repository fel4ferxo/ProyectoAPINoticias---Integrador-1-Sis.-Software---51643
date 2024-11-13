import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../services/data.service';
import { News } from '../news/news.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface EventItem{
  cabecera?: string;
  subtitular?: string;
  fecha: string;
  icono?: string;
  color?: string;
  imagen?: string;
  articulo?: string;
}
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TimelineModule, CardModule, ButtonModule, FormsModule, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  encapsulation: ViewEncapsulation.None
})


export class TimelineComponent implements OnInit{
  events: EventItem[]=[];
  newsData: News[] = [];

  editingHeader: boolean[] = [];
  editingSubheader: boolean[] = [];
  editingSubtitle: boolean[] = [];

  abrirLink(url: string){
    window.open(url, '_blank');
  }

  toggleEdit(index: number, field: string){
    switch(field){
      case 'header':{
        this.editingHeader[index] = !this.editingHeader[index];
        break;
      }
      case 'subheader':{
        this.editingSubheader[index] = !this.editingSubheader[index];
        break;
      }
      case 'subtitle': {
        this.editingSubtitle[index] = !this.editingSubtitle[index];
        break;
      }
    }
  }

  ngOnInit(){
    this.dataService.data$.subscribe((news)=> {
      this.newsData = news;
      console.log('Datos recibidos', this.newsData);
      this.events = this.newsData.map(news =>({
        cabecera: news.titular,
        subtitular: news.subtitulo,
        fecha: news.fechaPublicacion,
        icono: 'pi pi-calendar',
        color: '#FF9800',
        imagen: news.imagen,
        articulo: news.urlNoticia
      }))
      this.editingHeader = Array(this.events.length).fill(false);
      this.editingSubheader = Array(this.events.length).fill(false);
      this.editingSubtitle = Array(this.events.length).fill(false);
      
      console.log('Mapeados', this.events);
    });
  }
  constructor(private dataService: DataService) {
  }
}
