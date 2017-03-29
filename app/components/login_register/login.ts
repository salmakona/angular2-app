import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { contentHeaders } from './headers';
import { AuthHttp } from 'angular2-jwt';
@Component({
   selector: 'login',
    templateUrl: 'app/components/login_register/login.html',
    providers:[AuthenticationService]
   
})

export class LoginComponent implements OnInit{
    model: any = {};
    loading = false;
    error = '';
    public token: string;
    loggedIn = false;

    constructor(public router: Router, public http: Http,private authenticationService: AuthenticationService) {
        
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.loggedIn = this.authenticationService.isLoggedIn()
    }
         
    ngOnInit() {
        // reset login status
         this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.event,this.model.phone_num, this.model.passcode)
        .subscribe(result => {
                    if (result==true) {
                        console.log("XXXXXXXX");
                        this.router.navigate(['app']);
                    } else {
                        this.error = 'Phone or Passcode is incorrect';
                        this.loading = false;
                    }
                        console.log(result);
        });
           
    }

        /*signup(event:any) {
            event.preventDefault();
            this.router.navigate(['signup']);
        }*/

        
}