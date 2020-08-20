import { Inject, Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService) { }

  filterRequest(req: HttpRequest<any>): boolean {
    const anonUrls = [
      '/Users/authenticate'
    ];
    return anonUrls.some((url) => req.url.includes(url));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Jwt interceptor");
    if (!this.filterRequest(req)) {
      return this.authService.check().pipe(
        switchMap((authenticated) => {
          if (authenticated) {
            const JWT = `Bearer ${this.authService.accessToken}`;
            req = req.clone({
              setHeaders: {
                Authorization: JWT,
              },
            });
            return next.handle(req);
          } else {
            return next.handle(req);
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
