import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor( private loginService: LoginService) { }

  userModel:UserModel;
  isUserLoggedIn:boolean;
  ngOnInit(){
    this.userModel = this.loginService.userData;
    this.loginService.userDataChanged
    .subscribe( (userData)=>{
      this.userModel = userData;
    });

    this.isUserLoggedIn = this.loginService.loggedIn;
    this.loginService.loggedInChanged
    .subscribe( (loggedIn)=>{
      this.isUserLoggedIn = loggedIn;
    });
  }

  logout(){
    this.loginService.logout();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
