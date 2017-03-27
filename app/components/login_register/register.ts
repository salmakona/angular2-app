import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from './headers';
import { Observable } from 'rxjs/Observable';
import{AlertService} from './alert.service'


@Component({
  selector: 'signup',
  templateUrl: 'app/components/login_register/register.html',
   providers:[AlertService]

})
export class Signup {
  constructor(public router: Router, public http: Http,private alertService: AlertService) {
     
  }

  signup(event:any, phone_num:number, pin_num:string){
    event.preventDefault();
    let body = JSON.stringify({ phone_num, pin_num });
    console.log(body);
    console.log(this.http.post('http://api.grabngo.market/api/auth', body, { headers: contentHeaders }));
   return this.http.post('http://api.grabngo.market/api/auth', body, { headers: contentHeaders })
        .subscribe(
          response => {
            localStorage.setItem('id_token', response.json().id_token);
            this.alertService.success('Registration successful', true);
            //this.router.navigate(['items']);
          },
          error => {
            alert(error.text());
            console.log(error.text());
          }
        );
  }

  /*login(event:any) {
    event.preventDefault();
    this.router.navigate(['login']);
  }*/

}