//TODO: Crear una función para limpiar los datos recibidos en el 

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from'@angular/router';
import {FontAwesomeModule} from'@fortawesome/angular-fontawesome';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { formatDate } from '@angular/common';
interface News{
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
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
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

  private http = inject(HttpClient);
  newsData: News[] | null = null;
  noticiasFiltradas: News[] = [];
  noticiasOriginales: News[] = [];
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
  /* newsData: News[] = [
    {
      id: 1,
      categoria: 'Cultura', 
      portal: 'El Comercio', 
      titular: 'A',
      subtitulo: 'Subtítulo',
      nombreAutor: 'Nombre del autor',
      fechaPublicacion: '24 de octubre 2024',
      imagen: 'https://via.placeholder.com/600x300',
      contenido: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, lorem at dignissim gravida, eros sapien vehicula dolor, non lobortis lacus lorem sit amet lorem. Integer porttitor nisl sit amet dui malesuada, ut euismod quam fermentum. Cras non nibh eu eros euismod vehicula non et lacus.`,
      urlNoticia: ''

    },{
      id: 2,
      categoria: 'Deporte', 
      portal: 'El Comercio', 
      titular: 'B',
      subtitulo: 'Subtítulo',
      nombreAutor: 'Nombre del autor',
      fechaPublicacion: '24 de octubre 2024',
      imagen: 'https://via.placeholder.com/600x300',
      contenido: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, lorem at dignissim gravida, eros sapien vehicula dolor, non lobortis lacus lorem sit amet lorem. Integer porttitor nisl sit amet dui malesuada, ut euismod quam fermentum. Cras non nibh eu eros euismod vehicula non et lacus.`,
      urlNoticia: ''
    }
  ]; */

  
  filtrarNoticias(): void{
    if(this.newsData !== null){
      const base = 'https://newsapi.org/v2/';
      let endpoint = 'everything?';
      const llave = 'apiKey=ea5efb6dc68249c9a47dbb2e70bbfd90';
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
      if(filtrosParametros.length !== 0){
        const apiURL = `${base}${endpoint}${filtrosParametros.join('&')}&${llave}`;
        let idContador: number = 1;
        console.log(apiURL);
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
            this.cdr.detectChanges();
          }
        });
      } else{
        this.noticiasFiltradas = [...this.noticiasOriginales];
      }
      


      /* this.noticiasFiltradas = this.newsData.filter((news) => {
        const matchesTitular = news.titular.toLowerCase().includes(this.titularBuscar.toLowerCase());
        const matchesCategoria = this.categoriaBuscar ? news.categoria === this.categoriaBuscar : true;
        const matchesAutor = news.nombreAutor.toLowerCase().includes(this.dominioBuscar.toLowerCase());
        const añoPublicacion = parseInt(news.fechaPublicacion.slice(-4), 10)
        const matchesAñoInicio = this.inicioAnoBuscar !== null ? añoPublicacion >= this.inicioAnoBuscar : true;
        const matchesAñoFinal = this.finAnoBuscar !== null ? añoPublicacion <= this.finAnoBuscar : true;
  
        const isMatch = matchesTitular && matchesCategoria && matchesAutor && matchesAñoInicio && matchesAñoFinal;
  
        console.log(`News Title: ${news.titular}`);
        console.log(`Matches Titular: ${matchesTitular}`);
        console.log(`Matches Categoria: ${matchesCategoria}`);
        console.log(`Matches Autor: ${matchesAutor}`);
        console.log(`Matches Año Inicio: ${matchesAñoInicio}`);
        console.log(`Matches Año Final: ${matchesAñoFinal}`);
        console.log(`Is Match: ${isMatch}`);
  
        return isMatch;
      })
      console.log('Filtered News:', this.noticiasFiltradas);
      this.cdr.detectChanges();
      console.log(this.newsData);
      console.log(this.noticiasFiltradas); */
    }
  }
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
  constructor(private cdr: ChangeDetectorRef, private router: Router, private authService: AuthService){};

  onLogout(){
    this.authService.setLoggedIn(false);
    this.router.navigate(['/inicio-sesion'])
  }

  ngOnInit(): void {
    this.getNoticias();
    /* if(this.newsData !==null){
      this.noticiasFiltradas = [...this.newsData];
    } */
  };
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
