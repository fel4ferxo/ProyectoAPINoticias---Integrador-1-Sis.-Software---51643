//TODO: Reeescribir los últimos test para que verifique el LocalStorage
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegistroComponent],
      providers: [{ provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  function llenarFormulario(data: any) {
    component.registroForm.controls['nombre'].setValue(data.nombre);
    component.registroForm.controls['correo'].setValue(data.correo);
    component.registroForm.controls['password'].setValue(data.password);
    component.registroForm.controls['confirmacionPassword'].setValue(data.confirmacionPassword);
    component.registroForm.controls['opcionesPago'].setValue(data.opcionesPago);
    component.registroForm.controls['numeroCuenta'].setValue(data.numeroCuenta);
    component.registroForm.controls['terminos'].setValue(data.terminos);
  }

  it('El formulario no debe proceder si hay algún campo vacio', () => {
    llenarFormulario({
      nombre: 'User Name',
      correo: 'user@example.com',
      password: 'password123',
      confirmacionPassword: 'password123',
      opcionesPago: 'yape',
      numeroCuenta: '', 
      terminos: true
    });
    fixture.detectChanges();
    expect(component.registroForm.valid).toBeFalse();
  });

  
  it('El formulario no debe proceder si se ingresa un correo registrado: "test@example.com"', () => {
    llenarFormulario({
      nombre: 'User Name',
      correo: 'test@example.com', 
      password: 'password123',
      confirmacionPassword: 'password123',
      opcionesPago: 'yape',
      numeroCuenta: '12345678901234567890',
      terminos: true
    });
    fixture.detectChanges();
    expect(component.registroForm.valid).toBeFalse();
    expect(component.registroForm.controls['correo'].errors?.['invalidEmail']).toBeTrue();
  });

  it('El numero de cuenta debe de ser de 20 dígitos', () => {
    llenarFormulario({
      nombre: 'User Name',
      correo: 'user@example.com',
      password: 'password123',
      confirmacionPassword: 'password123',
      opcionesPago: 'yape',
      numeroCuenta: '12345', 
      terminos: true
    });
    fixture.detectChanges();
    expect(component.registroForm.valid).toBeFalse();
    expect(component.registroForm.controls['numeroCuenta'].errors?.['exactLength']).toBeTruthy();
  });

  
  it('Las contraseñas deben coincidir', () => {
    llenarFormulario({
      nombre: 'User Name',
      correo: 'user@example.com',
      password: 'password123',
      confirmacionPassword: 'password321', 
      opcionesPago: 'yape',
      numeroCuenta: '12345678901234567890',
      terminos: true
    });
    fixture.detectChanges();
    expect(component.registroForm.valid).toBeFalse();
    expect(component.registroForm.errors?.['mismatch']).toBeTruthy();
  });
  it('Debe redigiridir a inicio de sesión luego de un registro exitoso', () => {
    llenarFormulario({
      nombre: 'usuario',
      correo: 'valid@example.com',
      password: '1234',
      confirmacionPassword: '1234',
      opcionesPago: 'tarjeta',
      numeroCuenta: '12345678901234567890',
      terminos: true
    });
    component.onSubmit(); 
    expect(router.navigate).toHaveBeenCalledWith(['/inicio-sesion']);
  });
});