import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedInKey = 'isLoggedIn';

  isLoggedIn(): boolean{
    if(typeof localStorage !== 'undefined'){
      return localStorage.getItem(this.isLoggedInKey) === 'true';
    } else {
      console.warn('localStorage no definido');
    }
    return false;
  }
  
  setLoggedIn(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem(this.isLoggedInKey, 'true');
    } else {
      console.warn('localStorage no definido');
    }
  }

  logOut(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem(this.isLoggedInKey);
    }else{
      console.warn('localStorage no definido');
    }
    
  }
  constructor() {}
}
