import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/User.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard  {
  constructor(private userService:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userService.decodeJwtToken().payload.scope!="ROLE_USER"){
        window.location.replace("/angular-app/#/illus/list")
        return false
      }
    return true;
  }
  
}
