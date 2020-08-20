import { Injectable, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable, of, throwError, BehaviorSubject, Subject } from 'rxjs';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router:Router) { this.baseUri = "https://localhost:5001/"; }

  ngOnInit(){
    
  }



  private baseUri: string;

  loggedInChanged = new Subject<boolean>();
  loggedIn: boolean;

  userDataChanged = new Subject<UserModel>();
  userData: UserModel;

  updateUserData(data:UserModel){
    this.userData = data;
    this.userDataChanged.next(this.userData);
  }

  updateLoggedIn(isLoggedIn:boolean){
    this.loggedIn = isLoggedIn;
    this.loggedInChanged.next(isLoggedIn);
  }

  accessToken: string;

  login(username: string, password: string) {
    var request = new LoginModel(username, password);
    var url = this.baseUri + "Users/authenticate";
    return this.http.post<TokenModel>(url, request);
  }

  logout(){
    if(this.loggedIn){
      this.updateLoggedIn(false);
      this.cookieService.delete("viewa-token");
      this.router.navigateByUrl('');
    }

  }
  getUserData(username: string) {
    var url = this.baseUri + "Users/data/" + username;
    return this.http.get<UserModel>(url);
  }

  check(): Observable<boolean> {
    if (this.loggedIn) {
      return of(true);
    }

    if (!this.accessToken) {
      return of(false);
    }

    return of(true);
  }
}
