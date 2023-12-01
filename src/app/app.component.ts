import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ToolbarService } from './toolbar/toolbar.service';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
/**
 * @title Autosize sidenav
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //title = 'assignment-app';
  titre = 'Application de gestion des devoirs à rendre (Assignments)';
  //@ViewChild('sidenav') sidenav: MatSidenav;
  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.toolbarService.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.toolbarService.isExpanded) {
      this.isShowing = false;
    }
  }

  onLogin() {
    if (this.authService.loggedIn) {
      this.authService.logOut();
      this.router.navigate(['/home']);
    } else {
      this.authService.logIn();
    }
  }

  onLogin2() {
    //this.authService.logIn();
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    /*if (this.authService.loggedIn) {
      this.authService.logOut();
      this.router.navigate(['/home']);
    } else {
      this.authService.logIn();
    } */
  }
  isAuth() {
    return this.authService.loggedIn;
  }

  constructor(
    public toolbarService: ToolbarService,
    private authService: AuthService,
    private router: Router
  ) {}
}
