import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(catchError(err => {
      if(err.status == 401){
        this.authService.logout();
        location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}