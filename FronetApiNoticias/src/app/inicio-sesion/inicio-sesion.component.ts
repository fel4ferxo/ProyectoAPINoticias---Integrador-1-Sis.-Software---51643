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
  formLogin: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, this.isEmailValid.bind(this)]],
      password: ['', Validators.required],
    }, { validator: this.isCredentialValid.bind(this)});
  }
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


  onSubmit(){

    if (this.formLogin.valid){
      this.authService.setLoggedIn(true);
      this.router.navigate(['/news']);
  }
}
}
