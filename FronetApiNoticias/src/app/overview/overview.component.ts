import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//Interfaz de la línea de tiempo
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
  //Lineas de tiempo del usuario
  timelines: Timeline[] = [];
  visible: boolean= false;
  //Formulario de registro de una nueva línea de tiempo
  formLinea: FormGroup;
  //Contador utilizado para asignar una ID a la línea de tiempo, es temporal. Simula un AUTO_INCREMENT de MySQL
  contador: number = 0;

  /**
   * Función para registrar una nueva línea de tiempo.
   */

  onSubmit(){
    if(this.formLinea.valid){
      let fechaActual: Date = new Date();
      const lineaRegistrada = {
        id: ++this.contador,
        nombre: this.formLinea.get('nombre')?.value,
        fecha_creacion: fechaActual.toLocaleDateString(),
        fecha_ultimaModificacion: fechaActual.toLocaleDateString(),
        //Imagen de placeholder
        imagenPreview: 'https://anti-money-laundering.eu/wp-content/uploads/2024/01/news-2444778_1280.jpg'
      };
      //Se actualizan los datos en localStorage
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
      //Se vuelven a conseguir las lineas de tiempo
      this.getTimelines();
      //El formulario de registro de línea de tiempo se reinicia
      this.formLinea.reset();
    }
  }

  /**
   * Función que redirige al usuario a una línea de tiempo basándose en la ID de ésta
   * @param {number} id - ID de la línea de tiempo
   */
  abrirLinea(id: number){
    console.log("Abri linea funciona");
    this.router.navigate([`timeline`, id]);
  }
  /**
   * constructor: Inicializa recursos necesarios para el funcionamiento del resto de funciones y los validadores.
   * @param {FormBuilder} fb - Inicializa FormBuilder, este nos permite monitorear los valores y la validez del formulario, en este caso del formulario de registro de una nueva timeline
   * @param {Router} router - Inicializa Router, un servicio predeterminado de Angular que nos permite desplazarnos entre componentes
   */
  constructor(private fb: FormBuilder, private router: Router){
    this.formLinea = this.fb.group({
      nombre: ['', Validators.required] //Establece el valor por defecto e iniciliza el validador (en este caso se asegura de que el campo no este vacio)
    });
  }

  get f() { return this.formLinea.controls; }

  showDialog(){
    this.visible = true;
  }

  /**
   * Función que saca todas las líneas de tiempo del usuario
   */

  getTimelines(){
    if(typeof localStorage !== 'undefined'){
      this.timelines = this.getLocalStorageDate<Timeline[]>('timeline') || [];
      this.contador = this.timelines.length;
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

  navegarAComponent(rutaComponente: string): void{
    this.router.navigate([`/${rutaComponente}`]);
  }

  /**
   * Función que se ejecuta apenas se entra al componente, obtiene los datos de las noticias iniciales y de las líneas de tiempo del usuario
   */

  ngOnInit(): void {
    //Se crean líneas de tiempo de prueba, se puede borrar esta sección sin problemas
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
