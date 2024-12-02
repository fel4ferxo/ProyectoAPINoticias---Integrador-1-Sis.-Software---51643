import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {RouterModule} from'@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidarUsuarioService } from '../services/validar-usuario.service';
import { DataService } from '../services/data.service';

export interface Usuario{
  id: string,
  correo: string,
  telefono: string,
  metodoPago: string
}

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  usuarioAGuardar: Usuario | null = null;

  formLogin: FormGroup;
  loginError: string | null = null; // Para mostrar errores al usuario
  constructor(private ValidarUsuarioService: ValidarUsuarioService,private fb: FormBuilder, private router: Router, private authService: AuthService, private dataService: DataService) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, this.isEmailValid.bind(this)]],
      password: ['', Validators.required],
    });
  }
  isEmailValid(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  get f(){return this.formLogin.controls;}

  /**
   * Función que manda el ID a otros componentes para hacer CRUDs a la base de datos
   * @param {Usuario} usuario  - ID del usuario
   */

  sendDataUsuario(usuario: Usuario){
    this.dataService.setDataUsuario(usuario);
  }

  guardarUsuarioLocalStorage(usuario: Usuario){
    if(typeof localStorage !== 'undefined'){
        localStorage.setItem('email', JSON.stringify(usuario));
    }
  }

  onSubmit(){

    if (this.formLogin.valid) {
      const { correo, password } = this.formLogin.value;

      // Consumir la API
      this.ValidarUsuarioService.validarUsuario(correo, password).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.usuarioAGuardar = {
              id: usuario.idusuario,
              correo: usuario.correo,
              telefono: usuario.telefono,
              metodoPago: usuario.metodo_pago
            }
            this.guardarUsuarioLocalStorage(this.usuarioAGuardar);
            this.sendDataUsuario(this.usuarioAGuardar);
            this.authService.setLoggedIn(); // Marcar como autenticado
            this.router.navigate(['/news']); // Redirigir
          } else {
            // Usuario no encontrado
            this.loginError = 'Correo o contraseña incorrectos';
          }
        },
        error: (err) => {
          console.error('Error al validar usuario:', err);
          this.loginError = 'Error en el servidor. Intenta de nuevo más tarde.';
        }
      });
    }
}}
