import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {RouterModule} from'@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  /**
   * Es el controlador del formulario, nos permite acceder a todos sus campos
   * @type {FormGroup}*/
  formLogin: FormGroup;

  /**constructor: Inicializa los valores por defecto del cuestionario y los validadores
   * Validatores required checa que los campos no estén vacios
   * @param {FormBuilder} fb - Inicializa FormBuilder (y AbstractControl), este nos permite monitorear los valores y la validez del formulario dependiendo de validaciones personalizadas
   * @param {Router} router - Inicializa Router, un servicio predeterminado de Angular que nos permite desplazarnos entre componentes
   * @param {AuthService} authService - Inicializa el servicio de autorización, este servicio no permite al usuario acceder al componente si no está logeado
  */
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, this.isEmailValid.bind(this)]],
      password: ['', Validators.required],
    }, { validator: this.isCredentialValid.bind(this)});
  }

  /**
   * Función que checa que el correo ingreso exista
   * @param {AbstractControl} control - Formulario a evaluar
   *
   * @returns {ValidationErrors | null} - Validador que retorna error en el campo del correo si el correo no está registrado
   */

  isEmailValid(control: AbstractControl): ValidationErrors | null {
    if(typeof localStorage !== 'undefined') {
      const isLocalData =  localStorage.getItem("usuarioRegistrado");
      if(isLocalData != null){
        const usuarios = JSON.parse(isLocalData);
        const isUserFound =  usuarios.find((m:any)=>m.correo == control.value);
        return isUserFound != undefined ? null : {invalidPassword: true};
      }
    }
    return  {invalidEmail: true};
  }

  /**
   * Función que checa que los datos ingresados existan: Ejecuta isEmailValid y además checa la existencia de la contraseña asociada al correo ingresado.
   * @param {AbstractControl} group - Formulario a evaluar
   * @returns {ValidationErrors | null} - Validador que retorna error si, aunque el correo exista, la contraseña no está registrada o es incorrecta.
   */

  isCredentialValid(group: AbstractControl) {
    const password = group.get('password')?.value;
  
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      const isLocalData = localStorage.getItem("usuarioRegistrado");

      const correoError = this.isEmailValid(group.get('correo')!);
      if (correoError) {
        return correoError;
      }
  
      if (isLocalData != null) {
        const contraseñas = JSON.parse(isLocalData);
        const isPasswordValid = contraseñas.find((m: any) => m.password === password);
        return isPasswordValid !== undefined ? null : { invalidPassword: true };
      }
      return { invalidPassword: true };
    } else {
      console.warn('localStorage is not available');
      return { invalidPassword: true };
    }
  }
   

  get f(){return this.formLogin.controls;}

  /**
   * Función que autoriza el acceso al resto del sistema utilizando el servicio authService y luego redirecciona al usuario al feed de noticias 
   */
  onSubmit(){
    if (this.formLogin.valid){
      this.authService.setLoggedIn(true);
      this.router.navigate(['/news']);
  }
}
}
