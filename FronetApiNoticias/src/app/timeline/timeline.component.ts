import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../services/data.service';
import { News } from '../news/news.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Timeline} from '../overview/overview.component';
import { ActivatedRoute } from '@angular/router';

interface EventItem{
  id?: number,
  fk_timeline?: number,
  cabecera?: string,
  subtitular?: string,
  fecha: string,
  icono?: string,
  color?: string,
  imagen?: string,
  articulo?: string 
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
  eventosBase: EventItem[]=[];
  eventosNuevos: EventItem[]=[];

  events: EventItem[]=[];

  recieverId: string | null = null;
  newsData: News[] = [];

  editingHeader: boolean[] = [];
  editingSubheader: boolean[] = [];
  editingSubtitle: boolean[] = [];

  abrirLink(url: string){
    window.open(url, '_blank');
  }

  getLocalStorageDate<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  getEventos(timelineID: number): EventItem[]{
    let eventosRegistrados: EventItem[] = [];

    if(typeof localStorage !== 'undefined'){
      const eventos: EventItem[] = this.getLocalStorageDate<EventItem[]>("eventos") || [];
      const timelines: Timeline[] = this.getLocalStorageDate<Timeline[]>("timeline") || [];
      const existeTimeline = timelines.some((timeline) => timeline.id === timelineID);
      if(!existeTimeline){
        return [];
      }
      eventosRegistrados= eventos.filter((nt) => nt.fk_timeline === timelineID);
    }
    console.log("Eventos registrados", eventosRegistrados)
    return eventosRegistrados;
  }

  agregarNuevosEventos(): void{
    
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


  guardarNuevosEventos(eventosExistentes: EventItem[], eventosARegistrar: EventItem[]): void{
    const eventosTotalesAGuardar = eventosExistentes.concat(eventosARegistrar);
    console.log("Eventos totales a guardar", eventosTotalesAGuardar);
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('eventos', JSON.stringify(eventosTotalesAGuardar));
    }
  }

  ngOnInit(){
    this.route.paramMap.subscribe((params)=>{
      this.recieverId = params.get('id');
      if(this.recieverId){
        this.eventosBase = this.getEventos(Number(this.recieverId));
        console.log("Eventos ya existentes", this.eventosBase);
        let contadorId = this.eventosBase.length;
        this.dataService.getData(this.recieverId).subscribe({
          next: (newsData) =>{
            console.log('Datos recibidos:', newsData);
            this.newsData = newsData;
            this.eventosNuevos = this.newsData.map(news =>({
              id: ++contadorId,
              cabecera: news.titular,
              subtitular: news.subtitulo,
              fecha: news.fechaPublicacion,
              icono: 'fa-solid fa-calendar',
              color: '#FF9800',
              imagen: news.imagen,
              articulo: news.urlNoticia,
              fk_timeline: Number(this.recieverId)
            }))
            this.guardarNuevosEventos(this.eventosBase, this.eventosNuevos);
            console.log("Eventos nuevos", this.eventosNuevos)
          },
          error: (err) => console.error(err),
        });
        this.events = this.getEventos(Number(this.recieverId));
        console.log("Eventos de la linea", this.events);
        this.editingHeader = Array(this.events.length).fill(false);
        this.editingSubheader = Array(this.events.length).fill(false);
        this.editingSubtitle = Array(this.events.length).fill(false);
        
        console.log('Mapeados', this.events);
      }
    })
    

    /* this.dataService.data$.subscribe((news)=> {
      this.eventosNuevos = news;
      this.events = this.newsData.map(news =>({
        cabecera: news.titular,
        subtitular: news.subtitulo,
        fecha: news.fechaPublicacion,
        icono: 'pi pi-calendar',
        color: '#FF9800',
        imagen: news.imagen,
        articulo: news.urlNoticia
      }))
    });


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
    }); */
  }
  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }
}
