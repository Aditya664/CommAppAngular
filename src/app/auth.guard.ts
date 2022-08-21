import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from './services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private util: UtilityService, private route: Router) { }
  canActivate(): boolean {
    if (!this.util.gettoken()) {
      this.route.navigateByUrl("/welcome");
    }
    return this.util.gettoken();
  }
}


