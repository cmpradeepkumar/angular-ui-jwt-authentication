import { Component, VERSION, ViewChild, ElementRef } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  currentUser: User;
  
  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
