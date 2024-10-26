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
      correo: ['', [Validators.required, this.restrictedEmailValidator]],
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
  // Validator for matching passwords
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmacionPassword = group.get('confirmacionPassword')?.value;
    return password === confirmacionPassword ? null : { mismatch: true };
  }
  
  restrictedEmailValidator(control: AbstractControl): ValidationErrors | null {
    const forbiddenEmail = "test@example.com";
    return control.value === forbiddenEmail ? { invalidEmail: true }: null;
  }
  get f() { return this.registroForm.controls; }

  onSubmit(){
    if (this.registroForm.valid){
      this.router.navigate(['/inicio-sesion']);
    }
  }
}