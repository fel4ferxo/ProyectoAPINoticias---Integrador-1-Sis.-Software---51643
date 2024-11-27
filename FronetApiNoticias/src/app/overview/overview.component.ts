import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Timeline{
  id: number,
  nombre: string,
  fecha_creacion: string,
  fecha_ultimaModificacion: string,
  imagenPreview: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CardModule, CommonModule, ReactiveFormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewComponent implements OnInit{
  timelines: Timeline[] = [];
  visible: boolean= false;
  formLinea: FormGroup;
  contador: number = 0;

  onSubmit(){
    if(this.formLinea.valid){
      let fechaActual: Date = new Date();
      const lineaRegistrada = {
        id: ++this.contador,
        nombre: this.formLinea.get('nombre')?.value,
        fecha_creacion: fechaActual.toLocaleDateString(),
        fecha_ultimaModificacion: fechaActual.toLocaleDateString(),
        imagenPreview: 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg'
      };

      const isLocalData = localStorage.getItem('timeline');
      let localArray = [];
      if(isLocalData){
        try{
          localArray = JSON.parse(isLocalData);
          if(!Array.isArray(localArray)){
            localArray = [localArray];
          }
        } catch(error) {
          localArray = [];
        }
      }
      localArray.push(lineaRegistrada);
      localStorage.setItem('timeline', JSON.stringify(localArray));
      this.getTimelines();
      this.formLinea.reset();
    }
  }

  abrirLinea(id: number){
    console.log("Abri linea funciona");
    this.router.navigate([`timeline`, id]);
  }

  constructor(private fb: FormBuilder, private router: Router){
    this.formLinea = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  get f() { return this.formLinea.controls; }

  showDialog(){
    this.visible = true;
  }

  getTimelines(){
    if(typeof localStorage !== 'undefined'){
      this.timelines = this.getLocalStorageDate<Timeline[]>('timeline') || [];
      this.contador = this.timelines.length;
    } else{
      console.warn('localStorage not available');
    }
  }

  getLocalStorageDate<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      if(!localStorage.getItem('timeline')){
        localStorage.setItem('timeline', JSON.stringify([
          {
            id: 1,
            nombre: 'Prueba',
            fecha_creacion: '24-11-2024',
            fecha_ultimaModificacion: '24-11-2024',
            imagenPreview: 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg'
          },
          {
            id: 2,
            nombre: 'Prueba2',
            fecha_creacion: '24-11-2024',
            fecha_ultimaModificacion: '24-11-2024',
            imagenPreview: 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg'
          },
          {
            id: 3,
            nombre: 'Prueba3',
            fecha_creacion: '24-11-2024',
            fecha_ultimaModificacion: '24-11-2024',
            imagenPreview: 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg'
          },{
            id: 4,
            nombre: 'Prueba3',
            fecha_creacion: '24-11-2024',
            fecha_ultimaModificacion: '24-11-2024',
            imagenPreview: 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg'
          }
            
        ]))
      }
    } else {
      console.warn('localStorage is not available');
    }
    this.getTimelines();
    console.log(this.timelines);
  }
}
