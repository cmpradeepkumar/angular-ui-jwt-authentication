import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environments } from './environments';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  login(userName, password) {
    console.log("auth user ::"+userName);
    return this.http.post<any>(`${environments.apiUrl}/users/authenticate`,{userName, password}).pipe(map(user=>{
      console.log('user :: '+user.username);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); 
  }
}