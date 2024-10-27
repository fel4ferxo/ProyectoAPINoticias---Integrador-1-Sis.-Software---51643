import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInStatus = false;
  isLoggedIn(): boolean{
    return this.isLoggedInStatus;
  }
  setLoggedIn(status: boolean): void{
    this.isLoggedInStatus = status;
  }
  constructor() {}
}
