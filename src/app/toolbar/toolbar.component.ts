import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ToolbarService } from './toolbar.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isExpanded = true;
  onClick() {
    this.isExpanded = !this.isExpanded;
  }
  /*
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  */
  isAuth() {
    return this.authService.loggedIn;
  }
  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
  onLogin2() {
    //this.authService.logIn();
    this.router.navigate(['/login']);
  }
  constructor(
    public toolbarService: ToolbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
