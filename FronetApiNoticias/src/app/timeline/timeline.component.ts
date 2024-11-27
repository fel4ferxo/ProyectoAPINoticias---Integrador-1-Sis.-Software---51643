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
interface Noticias_timeline{
  fk_noticias: number,
  fk_timeline: number,
}

interface Base{
  timeline_id: number,
  eventos: EventItem[]
}
interface NoticiasBase{
  fk_timeline: number,
  noticias: News[]
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
  eventosNuevos: News[]=[];

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

  formarBase(timelineID: number): Base | null{
    const eventos: EventItem[] = this.getLocalStorageDate<EventItem[]>("eventos") || [];
    const timelines: Timeline[] = this.getLocalStorageDate<Timeline[]>("timeline") || [];
    const existeTimeline = timelines.some((timeline) => timeline.id === timelineID);
    if(!existeTimeline){
      return null;
    }

    const eventosRelacionados= eventos.filter((nt) => nt.fk_timeline === timelineID);
    const eventosBase: Base = {
      timeline_id: timelineID,
      eventos: eventosRelacionados
    };
    return eventosBase;
  }

  formarNoticiasBase(timelineID: number): NoticiasBase | null {
    
    const noticias: News[] =  this.getLocalStorageDate<News[]>("noticias")|| [];
    const noticiasTimeline: Noticias_timeline[] = this. getLocalStorageDate<Noticias_timeline[]>("noticias_timeline") || [];
    const timelines: Timeline[] = this.getLocalStorageDate<Timeline[]>("timeline") || [];
    

    const existeTimeline = timelines.some((timeline) => timeline.id === timelineID);
    if(!existeTimeline){
      return null;
    }

    const noticiasRelacionadasIds= noticiasTimeline.filter((nt) => nt.fk_timeline === timelineID).map((nt)=> nt.fk_noticias);
    const noticiasRelacionadas = noticias.filter((noticia) => noticiasRelacionadasIds.includes(noticia.id));
    const noticiasBase: NoticiasBase = {
      fk_timeline: timelineID,
      noticias: noticiasRelacionadas
    };
    return noticiasBase;
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

  crearSamples(){
    if(!localStorage.getItem('noticias')){
      localStorage.setItem("noticias", JSON.stringify([
        {
          id: 1,
          categoria: 'General',
          portal: 'NPR',
          titular: "Biden and Xi will meet on Saturday, the 3rd and likely final time during Biden's term",
          subtitulo: `This is likely to be their final meeting before President Biden leaves office. Biden sees it as a chance to reflect on the "tough relationship" between the two countries, an official said.`,
          nombreAutor: "Asma Khalid",
          fechaPublicacion: "13-11-2024",
          imagen: "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4690x2638+0+275/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fed%2Fc6%2F111ac0414803a337f5ffdf027b21%2Fgettyimages-1784305652.jpg",
          contenido: "LIMA, Peru President Biden will meet with Chinese President Xi Jinping on Saturday on the sidelines of the APEC summit in Lima, Peru, a senior U.S. administration official told reporters on Wednesday… ",
          urlNoticia: "https://www.npr.org/2024/11/13/nx-s1-5189429/biden-xi-meeting-lima"
        },
        {
          id: 2,
          categoria: 'General',
          portal: "ABC News",
          titular: "AI, North Korea, Trump: What Biden and Xi discussed in their final meeting",
          subtitulo: "President Joe Biden met with Chinese President Xi Jinping on the sidelines of the APEC conference in Lima, Peru -- their last meeting of Biden’s presidency.",
          nombreAutor: "Michelle Stoddart, Alex Presha",
          fechaPublicacion: "16-11-2024",
          imagen: "https://i.abcnewsfe.com/a/73a15c5f-d404-47ad-96fd-ff4bffaf4fb2/biden-xi-rt-jt-241116_1731793368363_hpMain_16x9.jpg?w=1600",
          contenido: "President Joe Biden met with Chinese President Xi Jinping face-to-face Saturday afternoon on the sidelines of the Asia-Pacific Economic Cooperation (APEC) conference in Lima, Peru -- their last meeti… ",
          urlNoticia: "https://abcnews.go.com/Politics/ai-north-korea-trump-biden-xi-discussed-final/story?id=115936991"
        },
      ]))
    }
    if(!localStorage.getItem('noticias_timeline')) {
      localStorage.setItem('noticias_timeline', JSON.stringify([
        {
          fk_noticias: 1,
          fk_timeline: 1,
        },{
          fk_noticias: 2,
          fk_timeline: 1,
        }

      ]))
    }
    if(!localStorage.getItem('eventos')){
      localStorage.setItem('eventos', JSON.stringify([
        {
          id: 1,
          fk_timeline: 1,
          cabecera: "Biden and Xi will meet on Saturday, the 3rd and likely final time during Biden's term",
          subtitular: `This is likely to be their final meeting before President Biden leaves office. Biden sees it as a chance to reflect on the "tough relationship" between the two countries, an official said.`,
          fecha: "13-11-2024",
          icono: 'pi pi-calendar',
          color: '#FF9800',
          imagen: "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4690x2638+0+275/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fed%2Fc6%2F111ac0414803a337f5ffdf027b21%2Fgettyimages-1784305652.jpg",
          articulo: "https://www.npr.org/2024/11/13/nx-s1-5189429/biden-xi-meeting-lima"
        },
        {
          id: 2,
          fk_timeline: 1,
          cabecera: "AI, North Korea, Trump: What Biden and Xi discussed in their final meeting",
          subtitular: "President Joe Biden met with Chinese President Xi Jinping on the sidelines of the APEC conference in Lima, Peru -- their last meeting of Biden’s presidency.",
          fecha: "16-11-2024",
          icono: 'pi pi-calendar',
          color: '#FF9800',
          imagen: "https://i.abcnewsfe.com/a/73a15c5f-d404-47ad-96fd-ff4bffaf4fb2/biden-xi-rt-jt-241116_1731793368363_hpMain_16x9.jpg?w=1600",
          articulo: "https://abcnews.go.com/Politics/ai-north-korea-trump-biden-xi-discussed-final/story?id=115936991"
        }
      ]))  
    }
    if(!localStorage.getItem('timeline')){
      localStorage.setItem('timeline', JSON.stringify([
        {
          id: 1,
          nombre: 'Prueba',
          fecha_creacion: '24-11-2024',
          fecha_ultimaModificacion: '24-11-2024',
          imagenPreview: 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg'
        }
      ]))
    }
  }
  ngOnInit(){
    this.crearSamples();  
    this.route.paramMap.subscribe((params)=>{
      this.recieverId = params.get('id');
      if(this.recieverId){
        this.dataService.getData(this.recieverId).subscribe({
          next: (newsData) =>{
            console.log('Datos recibidos: ${this.recieverId', newsData);
            this.newsData = newsData;
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
          },
          error: (err) => console.error(err),
        });
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
