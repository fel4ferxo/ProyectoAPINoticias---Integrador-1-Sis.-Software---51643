import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInStatus = false;
  private readonly isLoggedInKey = 'isLoggedIn';

  isLoggedIn(): boolean{
    if(typeof localStorage !== 'undefined'){
      return localStorage.getItem(this.isLoggedInKey) === 'true';
    } else {
      console.warn('localStorage no definido');
    }
    return this.isLoggedInStatus;
  }
  setLoggedIn(status: boolean): void{
    this.isLoggedInStatus = status;
    if(typeof localStorage !== 'undefined'){
      if(status){
        localStorage.setItem(this.isLoggedInKey, 'true');
      }else{
        localStorage.removeItem(this.isLoggedInKey)
      }
    } else {
      console.warn('localStorage no definido');
    }
  }

  logOut(): void{
    this.isLoggedInStatus = false;
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem(this.isLoggedInKey);
    }else{
      console.warn('localStorage no definido');
    }
    
  }
  constructor() {
    if(typeof localStorage !== 'undefined' && localStorage.getItem(this.isLoggedInKey) !== null){
      this.isLoggedInStatus = localStorage.getItem(this.isLoggedInKey) === 'true';
    }else{
      this.isLoggedInStatus = false;
      console.warn('localStorage no definido');
    }
  }
}
