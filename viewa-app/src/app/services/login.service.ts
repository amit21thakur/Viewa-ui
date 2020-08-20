import { Injectable, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { this.baseUri = "https://localhost:44319/"; }

  private baseUri: string;
  loggedIn: boolean;
  userData: UserModel;

  accessToken: string;

  login(username: string, password: string) {
    var request = new LoginModel(username, password);
    var url = this.baseUri + "Users/authenticate";
    return this.http.post<TokenModel>(url, request);
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
