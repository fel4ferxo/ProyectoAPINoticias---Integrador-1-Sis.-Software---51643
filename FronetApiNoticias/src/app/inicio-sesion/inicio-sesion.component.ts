import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {RouterModule} from'@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidarUsuarioService } from '../services/validar-usuario.service';
@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  formLogin: FormGroup;
  loginError: string | null = null; // Para mostrar errores al usuario
  constructor(private ValidarUsuarioService: ValidarUsuarioService,private fb: FormBuilder, private router: Router, private authService: AuthService) {
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


  onSubmit(){

    if (this.formLogin.valid) {
      const { correo, password } = this.formLogin.value;

      // Consumir la API
      this.ValidarUsuarioService.validarUsuario(correo, password).subscribe({
        next: (usuario) => {
          if (usuario) {
            // Usuario válido
            this.authService.setLoggedIn(true); // Marcar como autenticado
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
