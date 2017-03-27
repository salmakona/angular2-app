import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { contentHeaders } from './headers';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
     public token: string;
    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
     }


 login(event:any,phone_num:number, pin_num:string): Observable<boolean> {
     //event.preventDefault();
        let body = JSON.stringify({phone_num,pin_num });
        console.log(phone_num);
        console.log(pin_num);
        console.log(body);
        console.log(this.http.post('http://api.grabngo.market/api/auth',JSON.stringify({ phone_num: phone_num, pin_num: pin_num })));
         return this.http.post('http://api.grabngo.market/api/auth', body, { headers: contentHeaders })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().cc_token;
                console.log("Tokon:"+ token)
                if (token) {
                    console.log("HelloTokon");
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ phone_num: phone_num, pin_num: pin_num,token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            
            });
    }
    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}