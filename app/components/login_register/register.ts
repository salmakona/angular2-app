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

  signup(event:any, phone_num:number, passcode:string){
      event.preventDefault();
      let body = JSON.stringify({ phone_num, passcode });
      console.log(body);
      console.log(this.http.post('https://api.grabngo.market/api/users', body, { headers: contentHeaders }));
      return this.http.post('https://api.grabngo.market/api/users', body, { headers: contentHeaders })
          .subscribe(
            response => {
              //localStorage.setItem('id_token', response.json().user);
              this.alertService.success('Registration successful', true);
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