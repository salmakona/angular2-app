import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { contentHeaders } from './headers';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

    public token: string;
    private loggedIn = false;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token =localStorage.getItem('currentUser.passcode');
     }

 login(event:any,phone_num:number, passcode:string): Observable<boolean> {
     
     //event.preventDefault();
        let body = JSON.stringify({phone_num,passcode });
         return this.http.post('https://api.grabngo.market/api/auth', body, { headers: contentHeaders })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                //console.log(response.json());
                let ee = response.json().ErrorDetails;
                
                if(ee.Error>0){
                    console.log("This phone no or password not registred! ");
                     return false;
                }

                let user = response.json().user;
                //console.log("Tokon:"+ user._id);
                if (user._id) {
                    console.log("HelloTokon");
                    // set token property
                    this.token = user.passcode;
                    // store user and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ phone_num: phone_num, passcode: passcode,token: user.cc_token }));
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
     isLoggedIn(){
         console.log(this.token);
        return this.loggedIn;
    }

    
}