import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  Admin = false;

  logIn() {
    this.loggedIn = true;
  }
  logInAdmin() {
    this.loggedIn = true;
    this.Admin = true;
  }
  logOut() {
    this.loggedIn = false;
    this.Admin = false;
  }

  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.Admin); //resolve(this.loggedIn);
      }, 800);
    });
    return this.Admin;
  }
  isLogged() {
    const isUserAdmin = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn); //resolve(this.loggedIn);
      }, 800);
    });
    return this.loggedIn;
  }
  constructor() {}
}
