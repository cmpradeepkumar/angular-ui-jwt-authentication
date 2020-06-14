import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { mergeMap, materialize, delay, dematerialize } from "rxjs/operators";
import { User } from "../user";

const users: User[] = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User"
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

   return of(null)
    .pipe(mergeMap(handleRoute))
     .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate();
        case url.endsWith("/users") && method === "GET":
          return getUsers();
        default:
          return next.handle(req);
      }
    }

    function authenticate() {
      const userName = body.userName;
      const password = body.password;
      const user = users.find(
        x => x.username === userName && x.password === password
      );
      if (user) {
      return ok({
        id: user.id,
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
        token: "fake-jwt-token"
      });
      } else {
        return error("username and password is incorrect!");
      }
    }

    function getUsers() {
      if (!isLoggedIn()) return unAuthorized();
      return ok(users);
    }

    function error(errMess){
     return throwError({error: {message: errMess}});
    }

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }

    function unAuthorized() {
      return throwError({ status: 401, error: { message: "UnAuthorized" } });
    }
  }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};