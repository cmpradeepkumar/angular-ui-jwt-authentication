import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { environments } from "../environments";
import { Injectable } from "@angular/core";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = req.url.startsWith(environments.apiUrl);
    if(isLoggedIn && isApiUrl){
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${currentUser.token}`}
      })
    }
    return next.handle(req);
  }
}