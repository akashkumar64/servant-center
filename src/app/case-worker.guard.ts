import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaseWorkerGuard implements CanActivate {
  group: any;
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.group =
          user.signInUserSession.accessToken.payload['cognito:groups'][0];
        if (this.group == 'CaseWorker') {
          return true;
        } else {
          this._router.navigate(['/login']);
          return false;
        }
      })
      .catch(() => {
        this._router.navigate(['/login']);
        return false;
      });

    // if (this.group == 'CaseWorker') {
    //   return true;
    // } else {
    //   this._router.navigate(['/veteran']);
    //   return false;
    // }
    return true;
  }
}
