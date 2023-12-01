import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
//import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
/*
@NgModule({
  imports: [
    // ...
    MatSidenavModule,
    // ...
  ],
  // ...
})
*/
export class SidenavComponent implements OnInit {
  //@ViewChild('sidenav') sidenav: MatSidenav;
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

  constructor() {}

  ngOnInit(): void {}
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );
}

