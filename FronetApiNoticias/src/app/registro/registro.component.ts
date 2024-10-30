import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      confirmacionPassword: ['', Validators.required],
      opcionesPago: ['', Validators.required],
      numeroCuenta: ['', [Validators.required, this.exactLengthValidator(20)]],
      terminos: [false, Validators.requiredTrue]
    }, { validator: this.passwordsMatchValidator });
  }

  exactLengthValidator(length: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value ? control.value.toString() : '';
      return value.length === length ? null : { exactLength: { requiredLength: length, actualLength: value.length } };
    };
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmacionPassword = group.get('confirmacionPassword')?.value;
    return password === confirmacionPassword ? null : { mismatch: true };
  }
  
  get f() { return this.registroForm.controls; }


  onSubmit(){
    if (this.registroForm.valid) {
      const usuarioRegistrado = {
          nombre: this.registroForm.get('nombre')?.value,
          correo: this.registroForm.get('correo')?.value,
          numeroCuenta: this.registroForm.get('numeroCuenta')?.value,
          password: this.registroForm.get('password')?.value,
          monto: 5,
          tipoSuscripcion: 'Estandar'
      };

      const isLocalData = localStorage.getItem("usuarioRegistrado");
      let localArray = [];

      if (isLocalData != null) {
          // Ensure that the existing data is an array
          try {
              localArray = JSON.parse(isLocalData);
              if (!Array.isArray(localArray)) {
                  localArray = [localArray];
              }
          } catch (error) {
              localArray = [];
          }
      }

      localArray.push(usuarioRegistrado);
      localStorage.setItem('usuarioRegistrado', JSON.stringify(localArray));

      // Navigate to login page
      this.router.navigate(['/inicio-sesion']);
  }
  }
}