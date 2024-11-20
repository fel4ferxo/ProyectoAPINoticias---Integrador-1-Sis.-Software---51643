import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let mockAuthService : jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['setLoggedIn']);
    mockRouter = jasmine.createSpyObj('Router',['navigate']);

    await TestBed.configureTestingModule({
      imports: [NewsComponent],
      providers: [
        ChangeDetectorRef,
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería filtrar por titulo', () => {
    component.newsData = [
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'A', subtitulo: 'Sub A', nombreAutor: 'Autor A', fechaPublicacion: '2024', imagen: '', contenido: '', urlNoticia: ''},
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'B', subtitulo: 'Sub A', nombreAutor: 'Autor A', fechaPublicacion: '2024', imagen: '', contenido: '', urlNoticia: ''}
    ];
    component.titularBuscar = 'A';
    component.filtrarNoticias();
    expect(component.noticiasFiltradas.length).toBe(1);
    expect(component.noticiasFiltradas[0].titular).toBe('A');
  });

  it('Debería filtrar por categoria', () => {
    component.newsData = [
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'A', subtitulo: 'Sub A', nombreAutor: 'Autor A', fechaPublicacion: '2024', imagen: '', contenido: '', urlNoticia: ''},
      {id: 1, categoria: 'Deportes', portal: 'El Comercio', titular: 'B', subtitulo: 'Sub A', nombreAutor: 'Autor A', fechaPublicacion: '2024', imagen: '', contenido: '', urlNoticia: ''}
    ];
    component.categoriaBuscar = 'Deportes';
    component.filtrarNoticias();
    expect(component.noticiasFiltradas.length).toBe(1);
    expect(component.noticiasFiltradas[0].categoria).toBe('Deportes');
  });

  it('Debería filtrar por autor', () => {
    component.newsData = [
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'A', subtitulo: 'Sub A', nombreAutor: 'Autor A', fechaPublicacion: '2024', imagen: '', contenido: '', urlNoticia: ''},
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'B', subtitulo: 'Sub A', nombreAutor: 'Autor B', fechaPublicacion: '2024', imagen: '', contenido: '', urlNoticia: ''}
    ];
    component.categoriaBuscar = 'General';
    component.filtrarNoticias();
    expect(component.noticiasFiltradas.length).toBe(1);
    expect(component.noticiasFiltradas[0].nombreAutor).toBe('Autor B');
  });

  it('Debería filtrar rango de fechas', () => {
    component.newsData = [
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'A', subtitulo: 'Sub A', nombreAutor: 'Autor A', fechaPublicacion: '2022', imagen: '', contenido: '', urlNoticia: ''},
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'B', subtitulo: 'Sub A', nombreAutor: 'Autor A', fechaPublicacion: '2023', imagen: '', contenido: '', urlNoticia: ''},
      {id: 1, categoria: 'Cultura', portal: 'El Comercio', titular: 'C', subtitulo: 'Sub A', nombreAutor: 'Autor B', fechaPublicacion: '2024', imagen: '', contenido: '', urlNoticia: '' }
    ];

    component.inicioAnoBuscar = 2022;
    component.finAnoBuscar = 2024;
    component.filtrarNoticias();
    expect(component.noticiasFiltradas.length).toBe(2);
    expect(component.noticiasFiltradas.some(news => news.fechaPublicacion === '2023')).toBeTrue();
    expect(component.noticiasFiltradas.some(news => news.fechaPublicacion === '2024')).toBeTrue();
  });
});
