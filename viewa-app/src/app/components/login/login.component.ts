import { Component, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private cookieName: string = "viewa-token";


  constructor(private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router) { }

  username: string;
  password: string;
  
  ngOnInit() {
    this.loginService.updateLoggedIn(this.cookieService.check(this.cookieName));
  }

  loginSubmit() {

    this.loginService.login(this.username, this.password)
      .subscribe(token => {
        this.loginService.accessToken = token.token;
        if (this.cookieService.check(this.cookieName)) {
          this.cookieService.delete(this.cookieName);
        }
        this.cookieService.set(this.cookieName, token.token);
        this.loginService.updateLoggedIn( true);
        this.loginService.getUserData(this.username).subscribe(userData => {
            this.loginService.updateUserData(userData);
          }, error => {
              console.log('user data error');
              console.log(error);
        });
        this.router.navigateByUrl('');
      }, error => {
          this.loginService.updateLoggedIn( false);
          this.loginService.userData = new UserModel();
          console.error(error);
        });

  }
}

