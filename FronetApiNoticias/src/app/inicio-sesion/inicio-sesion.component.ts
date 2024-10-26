import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, this.isEmailValid.bind(this)]],
      password: ['', Validators.required],
    }, { validator: this.isCredentialValid.bind(this)});
  }
  isEmailValid(control: AbstractControl): ValidationErrors | null {
    return control.value === "test@example.com" ? null : {invalidEmail: true};
  }
  isCredentialValid(group: AbstractControl) {
    const correo = group.get('correo')?.value;
    const password = group.get('password')?.value;

    const correoError = this.isEmailValid(group.get('correo')!);
    if(correoError){
      return correoError;
    }
    return password === "1234" ? null : {invalidPassword: true};
  }  

  get f(){return this.formLogin.controls;}

  onSubmit(){
    if (this.formLogin.valid){
      this.router.navigate(['/news']);
  }
}
}
