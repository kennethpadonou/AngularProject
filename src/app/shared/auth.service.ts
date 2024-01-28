import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

interface User {
  username: string;
  password: string;
  admin: boolean;
  // Ajoutez ici d'autres propriétés si nécessaire
}
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


  /*login(username: string, password: string) {
    // Ici, vous pouvez vérifier les identifiants de l'utilisateur.
    // Pour l'instant, nous allons simplement connecter tous les utilisateurs.
    this.logIn();
    // Retourne un Observable qui émet true immédiatement
    return of(true);
  }
  */
 /*
  login(username: string, password: string) {
    return this.http.post(`http://localhost:8010/api/utilisateurs/authenticate`, { username, password }).pipe(
      map(user => {
        if (user) {
          // L'utilisateur existe et les identifiants sont corrects
          this.logIn();
          if (user.admin) {
            this.logInAdmin();
          }
          return true;
        } else {
          // Les identifiants sont incorrects
          return false;
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la connexion à l\'API', error);
        return of(false);
      })
    );
  }*/
  login(username: string, password: string) {
    return this.http.post<User>(`http://localhost:8010/api/utilisateurs/authenticate`, { username, password }).pipe(
      map((user: User) => {
        if (user) {
          // L'utilisateur existe et les identifiants sont corrects
          this.logIn();
          if (user.admin) {
            this.logInAdmin();
          }
          return true;
        } else {
          // Les identifiants sont incorrects
          return false;
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la connexion à l\'API', error);
        return of(false);
      })
    );
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
  constructor(private http: HttpClient) {}
}

