import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this.authService.currentUserValue;
    if(currentUser){
      return true;
    }
    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}});
    return false;
  }
}