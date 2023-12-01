import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router:Router) {}

  //let authService = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //return true;

    //return this.authService.isAdmin()
    //.then((authentifie:Boolean) => {
      const AdminUser = this.authService.isAdmin();
      const authentifie = this.authService.isLogged();
      debugger;
      console.log("auth : "+authentifie);
      if (authentifie) {
        if (AdminUser) {
          console.log("Connecté en tant qu'admin");
        } else {
          console.log("Connecté en tant qu'utilisateur");
        }
        //console.log('Authentifié');
        return true;
      } else {
        console.log('Pas authentifié');
        //this.router.navigate(['/home']);
        this.router.navigate(['/login']);
        return false;
      }


  }
}


// export const authGuard: CanActivateFn = (route, state) => {

//   let authService = inject(AuthService);
//   let router = inject(Router);

//   //Si renvoie true, l'utilisateur peut accéder à la route
//   return authService.isAdmin().
//   then((authentifie: any) => {
//     if (authentifie) {
//       console.log('Authentifié');
//       return true;
//     } else {
//       console.log('Pas authentifié');
//       router.navigate(['/home']);
//       return false;
//     }
//   });
// }
