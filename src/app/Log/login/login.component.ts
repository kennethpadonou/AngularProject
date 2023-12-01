import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usernameAdmin = 'admin';
  passwordAdmin = 'admin';
  username = 'root';
  password = 'root';
  nom: string | undefined;
  pass: string | undefined;

  onLoginUser(event: any) {
    event.preventDefault();
    debugger;
    if (this.nom === this.usernameAdmin && this.pass === this.passwordAdmin) {
      this.authService.logInAdmin();
      this.router.navigate(['/home']);
    }
    if (this.nom === this.username && this.pass === this.password) {
      this.authService.logIn();
      this.router.navigate(['/home']);
    }

    // if (this.authService.loggedIn) {
    //   this.authService.logOut();
    //   this.router.navigate(['/home']);
    // } else {
    //   this.authService.logIn();
    // }
  }
  constructor(
    //public toolbarService: ToolbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
