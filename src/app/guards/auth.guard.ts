import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private injector: Injector) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const oauthService: ApiService = this.injector.get(ApiService);

    if (!oauthService.isLoggedIn()) {
      return true;
    }
    
    oauthService.goToPages();
    return false;
  }
}