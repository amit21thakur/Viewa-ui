import { Injectable, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable, of, throwError, BehaviorSubject, Subject } from 'rxjs';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { EventModel, DateGroup } from '../models/event.model';


@Injectable()
export class EventService {

  constructor(private http: HttpClient ) { this.baseUri = "https://localhost:5001/"; }

  ngOnInit(){
  }

  private baseUri: string;

  getEvents(dateGroup:DateGroup, eventType:string, gender:string, deviceType:string){
      console.log('here');
    var url = this.baseUri + "Events";

    var params = "";
    if(dateGroup && dateGroup.start && dateGroup.end){
        dateGroup.start.setDate(dateGroup.start.getDate() + 1);
        dateGroup.end.setDate(dateGroup.end.getDate() + 2);

        params = "start=" + dateGroup.start.toISOString().substring(0, 10) + "&end=" + dateGroup.end.toISOString().substring(0, 10);
    }
    if(params && params.length > 0)
    {
        url += "?" + params;
    }


    return this.http.get<EventModel[]>(url);
  }


}