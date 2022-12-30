import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.getToken() !== null) {
      const roles = route.data["roles"] as Array<string>
      if (roles) {
        const match = this.userService.roleMatch(roles)
        if (match) {
          return true
        }
        this.router.navigate(['/forbidden'])
        return false;
      }
    }
    this.router.navigate(['/login'])
    return false;
  }
}
