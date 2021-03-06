import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
} 