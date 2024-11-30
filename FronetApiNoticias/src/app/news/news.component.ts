import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from'@angular/router';
import {FontAwesomeModule} from'@fortawesome/angular-fontawesome';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { formatDate } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule} from 'primeng/contextmenu';
import { DataService } from '../services/data.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Timeline } from '../overview/overview.component';
//Interfaz de la noticia
export interface News{
  id: number;
  categoria: string;
  portal: string;
  titular: string;
  subtitulo: string;
  nombreAutor: string;
  fechaPublicacion: string;
  imagen: string;
  contenido: string;
  urlNoticia: string;
}
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule, ContextMenuModule, ToolbarModule, ButtonModule, CardModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  encapsulation: ViewEncapsulation.None
})

export class NewsComponent implements OnInit{
  titularBuscar: string = '';
  categoriaBuscar: string = '';
  paisBuscar: string='';
  dominioBuscar: string='';
  inicioAnoBuscar: number | null = null;
  finAnoBuscar: number | null = null;
  categorias = ['General', 'Negocios', 'Entretenimiento', 'Salud', 'Ciencia', 'Deportes', 'Tecnología'];
  pais: string='';

  //Noticias que serán agregadas a la línea de tiempo
  dataEnviada: News[] = [];
  //Elementos del menu contextual que aparece cuando le das click derecho a una noticia
  items: MenuItem[]=[];
  selectedNews: News | null = null;
  arrayTemporal: any[] = [];
  toolbarVisible: boolean = false;

  timelines: Timeline[] = [];

  private http = inject(HttpClient);
  newsData: News[] | null = null;
  noticiasFiltradas: News[] = [];
  noticiasOriginales: News[] = [];
  /**
   * Función que hace una solicitud inicial para mostrar noticias apenas cargue la página.
   * Estas noticias terminan siendo asignadas a dos arrays: 
   * noticiasFiltradas (las noticias que son mostradas después de cada búsqueda), y 
   * noticias originales (array que contiene las noticias que muestra las primeras noticias que aparecieron para no gastar una solicitud de la API)
   */
  getNoticias():void{
    const apiURL = 'https://newsapi.org/v2/everything?q=peru&apiKey=ea5efb6dc68249c9a47dbb2e70bbfd90';
    let idContador= 1;
    this.http.get<{articles: any[]}>(apiURL).subscribe({
      next: (response) => {
        this.newsData = response.articles.map((article) => ({
          id: idContador++,
          categoria: 'General', 
          portal: article.source?.name || '', 
          titular: article.title,
          subtitulo: article.description,
          nombreAutor: article.author,
          fechaPublicacion: article.publishedAt,
          imagen: article.urlToImage,
          contenido: article.content,
          urlNoticia: article.url
        }));
        this.noticiasFiltradas = [...this.newsData];
        this.limpiarNoticias();
        this.noticiasOriginales = [...this.noticiasFiltradas];
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Función que saca todas las líneas de tiempo del usuario
   */

  getTimelines(){
    if(typeof localStorage !== 'undefined'){
      this.timelines = this.getLocalStorageDate<Timeline[]>('timeline') || [];
    } else{
      console.warn('localStorage not available');
    }
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
   * Función que hace solicitudes a la API para la búsqueda y filtrado de noticias
   */
  filtrarNoticias(): void{
    if(this.newsData !== null){
      const base = 'https://newsapi.org/v2/';
      //El endpoint es una variable ya que la busqueda por categorías no es aplicable a "everything", solo "top-headlines"
      let endpoint = 'everything?';
      const llave = 'apiKey=ea5efb6dc68249c9a47dbb2e70bbfd90';
      //Array que contiene todos los filtros aplicados
      const filtrosParametros: string [] = [];
      if(this.titularBuscar){
        filtrosParametros.push(`q=${encodeURIComponent(this.titularBuscar)}&searchIn=title`);
      }
      if(this.dominioBuscar){
        filtrosParametros.push(`domains=${encodeURIComponent(this.dominioBuscar.toLowerCase())}`);
      }
      if(this.inicioAnoBuscar){
        filtrosParametros.push(`from=${this.inicioAnoBuscar}`);
        if(!this.titularBuscar){
          filtrosParametros.push('q=peru');
        }
      }
      if(this.finAnoBuscar){
        filtrosParametros.push(`to=${this.finAnoBuscar}`);
        if(!this.titularBuscar){
          filtrosParametros.push('q=peru');
        }
      }
      if(this.categoriaBuscar){
        endpoint = 'top-headlines?';
        switch(this.categoriaBuscar){
          case 'General':{
            filtrosParametros.push(`category=general`);
            break;
          }
          case 'Negocios': {
            filtrosParametros.push(`category=business`);
            break;
          }
          case 'Entretenimiento':{
            filtrosParametros.push(`category=entertainment`);
            break;
          }
          case 'Salud':{
            filtrosParametros.push(`category=health`);
            break;
          }
          case 'Ciencia':{
            filtrosParametros.push(`category=science`);
            break;
          }
          case 'Deportes':{
            filtrosParametros.push(`category=sports`);
            break;
          }
          case 'Tecnología':{
            filtrosParametros.push(`category=technology`);
            break;
          }
        }
      }
      //Se hace una solicitud en caso de que hayan filtros
      if(filtrosParametros.length !== 0){
        //Se forma la URL de la solicitud
        const apiURL = `${base}${endpoint}${filtrosParametros.join('&')}&${llave}`;
        let idContador: number = 1;
        console.log(apiURL);
        //Se extraen todas las noticias del resultado
        this.http.get<{articles: any[]}>(apiURL).subscribe({
          next: (response) => {
            this.newsData = response.articles.map((article) => ({
              id: idContador++,
              categoria: 'General', 
              portal: article.source?.name || '', 
              titular: article.title,
              subtitulo: article.description,
              nombreAutor: article.author,
              fechaPublicacion: article.publishedAt,
              imagen: article.urlToImage,
              contenido: article.content,
              urlNoticia: article.url
            }));
            //Se asigna un nuevo valor a las noticiasFiltradas, las noticias que son mostradas en la pantalla
            this.noticiasFiltradas = [...this.newsData];
            this.limpiarNoticias();
            this.cdr.detectChanges();
          }
        });
      } else{
        this.noticiasFiltradas = [...this.noticiasOriginales];
      }
    }
  }
  /**
   * Función que remueve noticias defectuosas, formatea la fecha de publicación, agrega el campo de autor si falta y agrega una imagen de placeholder en caso de que la imagen original sea inaccesible
   */
  limpiarNoticias(){
    this.noticiasFiltradas = this.noticiasFiltradas.filter(noticias => noticias.contenido !== '[Removed]');
    this.noticiasFiltradas.forEach(function(noticias){
      noticias.contenido =  noticias.contenido.replace(/\[\+\d+\s+chars\]$/, '');
      noticias.fechaPublicacion = formatDate(noticias.fechaPublicacion, 'dd-MM-yyyy', 'en-US');
      if(noticias.imagen === null){
        noticias.imagen = 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg';
      }
      if(noticias.nombreAutor === null){
        noticias.nombreAutor = "Anónimo";
      }
    });
  }
  /**
   * constructor: Inicializa recursos necesarios para el funcionamiento del resto de funciones
   * @param {ChangeDetectorRef} cdr - Inicializa ChangeDetectorRef, un detector de cambios en la página, permiten que se vean sin tener que recargar la página.
   * @param {Router} router -Inicializa Router, un servicio predeterminado de Angular que nos permite desplazarnos entre componentes
   * @param {AuthService} authService  - Inicializa AuthService, el servicio que cheque que el usuario este logeado para permitir el acceso.
   * @param {DataService} dataService  - Inicializa DataService, el servicio que nos permite mandar datos entre componentes.
   */
  constructor(private cdr: ChangeDetectorRef, private router: Router, private authService: AuthService, private dataService: DataService){};

  /**
   * Función que manda las noticias seleccionadas por el usuario para unirlas a una línea de tiempo
   * @param {string} receiverId - ID de la línea de tiempo
   */
  sendData(receiverId:string){
    if(this.dataEnviada.length > 0){
      this.dataService.setData(receiverId, this.dataEnviada);  
      console.log(this.dataEnviada);
      this.router.navigate(['/timeline', receiverId]);
    }else{
      console.log('Nada que enviar');
    }
    
  }
  /**
   * Función que cierra la sesión
   */
  onLogout(){
    this.authService.logOut();
  }

  /**
   * Función que se ejecuta apenas se entra al componente, obtiene los datos de las noticias iniciales y de las líneas de tiempo del usuario
   */

  ngOnInit(): void {
    this.getNoticias();
    this.items = [
      {label: 'Agregar a línea de tiempo', icon: 'pi pi-sitemap', command: () => this.seleccionarNoticias(this.selectedNews)}
    ];
    this.getTimelines();
    /* if(this.newsData !==null){
      this.noticiasFiltradas = [...this.newsData];
    } */
  };

  /**
   * Función para seleccionar noticias
   * @param selectedCardData 
   * @returns 
   */
  seleccionarNoticias(selectedCardData: any){
    if(!selectedCardData){
      console.log("No items seleccionados");
      return;
    }
    //Hace aparecer un menú de opciones para la selección de las noticias
    if(!this.toolbarVisible){
      this.toolbarVisible = true; 
      this.cdr.detectChanges();
    }

    console.log(this.toolbarVisible)
      this.arrayTemporal.push(selectedCardData);
      console.log("selected news: ", selectedCardData);
      console.log("current selection", this.arrayTemporal);
    
  }
  /**
   * Función que cancela la selección de las noticias
   */
  cancelarSeleccion(){
    this.arrayTemporal = [];
    //Oculta el menú de opciones
    this.toolbarVisible = false;
  }

  /**
   * Función que agrega las noticias seleccionadas al array final para agregarse a la línea de tiempo
   */
  agregarNoticiasTimeline():void{
    this.dataEnviada = [...this.arrayTemporal];
    this.toolbarVisible = false;
  }

  /**
   * Función que hace aparecer el modal del lector de noticias
   * @param {News} news - Noticia que se desea leer.
   */

  openNewsModal(news: News){
    const modal = document.getElementById('modal-articulo') as HTMLDialogElement;
    const cabecera = document.getElementById('cabecera')!;
    const cuerpo = document.getElementById('cuerpo')!;

    cabecera.innerHTML = `
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand text-white" href="#">
            <img src="./assets/imagenes/Chasky_News__3_-removebg-preview.png" alt="LogoChasky" width="120" height="120" class="d-inline-block align-text-center">
            ${news.categoria}
          </a>
        </div>
      </nav>
    `;

    cuerpo.innerHTML = `
      <div class="news-outlet text-center">
        <p>Portal de origen: <span>${news.portal}</span></p>
      </div>
      <div class="text-center">
        <h1>${news.titular}</h1>
        <h3 class="drophead">${news.subtitulo}</h3>
      </div>
      <div class="text-center my-4">
        <img src="${news.imagen}" alt="Imagen de la noticia" class="img-fluid">
      </div>
      <hr>
      <div class="author-date">
        <p><strong><i class="fa-solid fa-user"></i> ${news.nombreAutor}</strong></p>
        <p><em>Publicado el: ${news.fechaPublicacion}</em></p>
      </div>
      <hr>
      <div class="mt-4">
        <p>${news.contenido}</p>
        <a href="${news.urlNoticia}" target="_blank">¡Lea el artículo completo aquí!</a>
      </div>
    `;
    modal.showModal();
    modal.addEventListener('click', (e) =>{
      if(e.target === modal) modal.close();
    })
  }; 
}
