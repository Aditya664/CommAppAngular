import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from '../services/utility.service';

@Injectable({
  providedIn: 'root'
})

export class UserGaurdGuard implements CanActivate {
  users = this.util.getFromLocalStorage('users');
  constructor(private router: Router, private util: UtilityService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = Number(route.paramMap.get('id'));

    if (isNaN(id) || id < 1) {
      alert("Invalid user Id");
      this.router.navigate(['/users']); // redirect 
      return false;
    }
    return true;
  }
}
