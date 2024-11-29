import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

//Servicio que es utilizado para restringir el acceso del usuario en caso no se haya registrado.
//Verifica el booleano del servicio authService, si es "true" el usuario accede con tranquilidad al componente
//De ser false, es redirigido al inicio de sesión inmediatamente
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(): boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/inicio-sesion'])
      return false;
    }
  }
};
