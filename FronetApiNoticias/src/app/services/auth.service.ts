import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInStatus = false;
  private readonly isLoggedInKey = 'isLoggedIn';

  isLoggedIn(): boolean{
    return this.isLoggedInStatus;
  }
  setLoggedIn(status: boolean): void{
    this.isLoggedInStatus = status;
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem(this.isLoggedInKey, status.toString());
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
    if(typeof localStorage !== 'undefined'){
      this.isLoggedInStatus = localStorage.getItem(this.isLoggedInKey) === 'true';
    }else{
      console.warn('localStorage no definido');
    }
  }
}
