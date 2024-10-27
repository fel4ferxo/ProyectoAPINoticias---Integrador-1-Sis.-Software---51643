//TODO: Reeescribir los últimos test para que verifique el LocalStorage
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { InicioSesionComponent } from './inicio-sesion.component';

describe('InicioSesionComponent', () => {
  let component: InicioSesionComponent;
  let fixture: ComponentFixture<InicioSesionComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioSesionComponent, ReactiveFormsModule, AppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioSesionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  function llenarFormulario(data: any){
    component.formLogin.controls['correo'].setValue(data.correo);
    component.formLogin.controls['password'].setValue(data.password);
  }
  it('El formulario del login no debe proceder si tiene algun campo vacio', () => {
    llenarFormulario({
      correo: 'test@example.com',
      password: ''
    })
    fixture.detectChanges();
    expect(component.formLogin.valid).toBeFalse();
  });
  it('La cuenta debe estar registrada', () => {

    llenarFormulario({
      correo: 'no@example.com',
      password: '123'
    })
    fixture.detectChanges();
    expect(component.formLogin.valid).toBeFalse();
  });
  it('La contraseña debe corresponder a la cuenta', () => {
    llenarFormulario({
      correo: 'test@example.com',
      password: '1234'
    })
    fixture.detectChanges();
    expect(component.formLogin.valid).toBeTrue();
  });
});
