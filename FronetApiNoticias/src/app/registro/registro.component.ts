import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../services/validar-usuario.service';
import { ValidarUsuarioService } from '../services/validar-usuario.service';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  /**
   * Es el controlador del formulario, nos permite acceder a todos sus campos
   * @type {FormGroup}*/

  registroForm: FormGroup;

  /**constructor: Inicializa los valores por defecto del cuestionario y los validadores
   * Validatores required checa que los campos no estén vacios
   * @param {FormBuilder} fb - Inicializa FormBuilder (y AbstractControl), este nos permite monitorear los valores y la validez del formulario dependiendo de validaciones personalizadas
   * @param {Router} router - Inicializa Router, un servicio predeterminado de Angular que nos permite desplazarnos entre componentes
  */
  usuario: Usuario = {
    name: '',
    apellido_p: '',
    apellido_m: '',
    correo: '',
    telefono: '',
    metodo_pago: '',
    nro_cuenta: '',
    password: ''
  };
  mensaje: string='';
  constructor(private ValidarUsuarioService:ValidarUsuarioService,private fb: FormBuilder, private router: Router) {
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


  /**
   * Función que checa que el número de cuenta sea de 20 dígitos
   * @param {number} length - Longitud que el número de cuenta que debe tener.
   *
   * @returns {(control: AbstractControl) => (ValidationErrors | null)} - validador que retorna un error (ValidationErrors) en caso de que el número de cuenta ingresado no sea de 20 dígitos
   */
  exactLengthValidator(length: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value ? control.value.toString() : '';
      return value.length === length ? null : { exactLength: { requiredLength: length, actualLength: value.length } };
    };
  }
  /**
   * Función que checa que las contraseñas ingresadas (la que será registrada y la de confirmación) sean las mismas
   * @param {FormGroup} group  - Es el formulario (registroForm)
   * @returns {ValidationErrors | null}  - Validador que retorna el error (mismatch: true) si son distintas
   * mismatch: true activa a su vez la aparición del texto que indica la invalidez de las contraseñas en el HTML
   */
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmacionPassword = group.get('confirmacionPassword')?.value;
    return password === confirmacionPassword ? null : { mismatch: true };
  }
  crearUsuario() {
    this.ValidarUsuarioService.createUsuario(this.usuario).subscribe({
      next: (response) => {
        this.mensaje = `Usuario creado con ID: ${response}`;
        this.router.navigate(['/inicio-sesion']);
      },
      error: (error) => {
        if (error.status === 400) {
          this.mensaje = `Error: ${error.error.error}`;
        } else {
          this.mensaje = 'Error interno del servidor.';
        }
      }
    });
  }
  get f() { return this.registroForm.controls; }

  /**
   * Función que registra los datos ingresados una vez que el formulario sea valido y se pueda enviar
   */
  onSubmit(){
    console.log('OnSubmit');
    if (this.registroForm.valid) {
      const usuarioRegistrado = {
          nombre: this.registroForm.get('nombre')?.value,
          correo: this.registroForm.get('correo')?.value,
          numeroCuenta: this.registroForm.get('numeroCuenta')?.value,
          password: this.registroForm.get('password')?.value,
          monto: 5,
          tipoSuscripcion: 'Estandar'
      };
      //Se guarda en local storage, para eso se tiene que actualizar el registro
      const isLocalData = localStorage.getItem("usuarioRegistrado"); //Verifica que hayan registros
      /**
     * Array temporal al que se asigna los registros existentes
     */
      let localArray = [];

      if (isLocalData != null) {
          // Verifica que haya registros
          try {
              localArray = JSON.parse(isLocalData);
              if (!Array.isArray(localArray)) {
                  localArray = [localArray]; //De existir un registro, asigna su valor a localArray.
              }
          } catch (error) {
              localArray = []; //De no existir, el localArray se mantiene vacio
          }
      }

      //Se agregan los valores a registrar a localArray y se vuelven a registrar dentro de localStorage
      localArray.push(usuarioRegistrado);
      localStorage.setItem('usuarioRegistrado', JSON.stringify(localArray));

      //Se redirecciona al usuario a la página de inicio de sesión
      this.router.navigate(['/inicio-sesion']);
  }
  }
}
