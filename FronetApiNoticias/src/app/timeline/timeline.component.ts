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
  //Eventos ya registrados en la base de datos
  eventosBase: EventItem[]=[];
  //Eventos que serán registrados
  eventosNuevos: EventItem[]=[];

  //Eventos que se mostraran en la línea de tiempo, es una union de eventosBase y eventosNuevos
  events: EventItem[]=[];

  //ID de la linea de tiempo, se utiliza para el acceso de lineas de tiempo por ID en la URL y para añadir los nuevos eventos correctamente
  recieverId: string | null = null;
  //Son las noticias recibidas para agregarlas a la línea de tiempo
  newsData: News[] = [];

  //Booleans que controlan la edición de los campos de los eventos (exceptuando la imagen)
  editingHeader: boolean[] = [];
  editingSubheader: boolean[] = [];
  editingSubtitle: boolean[] = [];

  /**
   * Funcion que abre links, en este caso los de los artículos
   * @param {string} url - URL de la noticia
   */

  abrirLink(url: string){
    window.open(url, '_blank');
  }

  /**
   * Función general que saca datos de LocalStorage
   * @param {string} key - Es el nombre de la tabla de donde sacar los datos
   * @returns {JSON.parse(data) | null} - Regresa los datos que haya encontrado en caso de que existan
   */

  getLocalStorageDate<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Funcion que busca todos los eventos de una línea de tiempo
   * @param {number} timelineID - ID de la línea de tiempo
   * @returns {EventItem} - Regresa los eventos registrados de existir, si está vacio da un resultado vacio
   */

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

  /**
   * Función que se encarga de la edición de los campos de un evento
   * @param {number} index - ID del evento a editar
   * @param {string} field - Campo del evento a editar
   */

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

  /**
   * Funcion que guarda los eventos recibidos desde el feed de noticias
   * @param {EventItem} eventosExistentes - Eventos ya registrados
   * @param {EventItem} eventosARegistrar - EVentos recibidos por el servicio por registrar
   */

  guardarNuevosEventos(eventosExistentes: EventItem[], eventosARegistrar: EventItem[]): void{
    const eventosTotalesAGuardar = eventosExistentes.concat(eventosARegistrar);
    console.log("Eventos totales a guardar", eventosTotalesAGuardar);
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('eventos', JSON.stringify(eventosTotalesAGuardar));
    }
  }

  /**
   * Funcion que se ejecute ni bien el componente es abierto
   */

  ngOnInit(){
    //Recibe la ID de la línea de tiempo 
    this.route.paramMap.subscribe((params)=>{
      this.recieverId = params.get('id');
      if(this.recieverId){
        //Se obtienen los eventos registrados
        this.eventosBase = this.getEventos(Number(this.recieverId));
        console.log("Eventos ya existentes", this.eventosBase);
        //Contador que le asigna una ID a los nuevos eventos por registrarse. Simula el AUTO_INCREMENT de MySQL
        let contadorId = this.eventosBase.length;
        //Recibe las noticias mandadas desde el feed utiliando el servicio dataService
        this.dataService.getData(this.recieverId).subscribe({
          next: (newsData) =>{
            console.log('Datos recibidos:', newsData);
            this.newsData = newsData;
            //Usando estas noticisa de base, se forman los nuevos eventos
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
            //Se guardan los nuevos eventos de existir
            this.guardarNuevosEventos(this.eventosBase, this.eventosNuevos);
            console.log("Eventos nuevos", this.eventosNuevos)
          },
          error: (err) => console.error(err),
        });
        //Se asignan los eventos ya registrados (incluyendo ahora los nuevos) a los eventos que se van a mostrar en la línea de tiempo
        this.events = this.getEventos(Number(this.recieverId));
        console.log("Eventos de la linea", this.events);
        //Se inicializan los booleanos de la edición de campos
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

  /**
  * constructor: Inicializa recursos necesarios para el funcionamiento del resto de funciones. 
  * @param {DataService} dataService - Inicializa el servicio que permite mandar datos entre componentes
  * @param {ActivatedRoute} route - Servicio de Angular que permite el mostrar distintas noticas de tiempo dependiendo de la URL (que dependen del ID)
  */
  }
  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }
}
