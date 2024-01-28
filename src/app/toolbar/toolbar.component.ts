import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ToolbarService } from './toolbar.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  login: string | undefined;
  password: string | undefined;
  loginError = false;
  
  isExpanded = true;
  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  isAuth() {
    return this.authService.loggedIn;
  }
  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
  /*
  onLogin2() {
    //this.authService.logIn();
    this.router.navigate(['/login']);
  }
  */

  onLogin() {
    if (this.login !== undefined && this.password !== undefined) {
    this.authService.login(this.login, this.password).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // L'utilisateur est connecté
        this.router.navigate(['/home']);
        this.loginError = false;
      } else {
        // Les identifiants sont incorrects
        this.loginError = true;
        this.openAlert();
      }
    });
  } else {
    console.log("Veuillez saisir un login et un mot de passe");
  }
  }
  
  constructor(
    public toolbarService: ToolbarService,
    private authService: AuthService,
    private router: Router,
    //private dialog: MatDialog
  ) {}

  openAlert() {
    window.alert('Login incorrect');
  }
  ngOnInit(): void {}
}
