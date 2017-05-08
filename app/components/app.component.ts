import {Component} from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login_register/login';
import { AuthenticationService } from './login_register/authentication.service';

@Component({
    selector: 'app',
    templateUrl:'app/components/main.html',
  // styleUrls:['../app/components/style.css'],
    providers:[AuthenticationService]
})
export class AppComponent {


        loggedIn = false;
        constructor(private _router: Router,private authenticationService: AuthenticationService,){
                this._router.navigate(["/viewlocation"]);
                this.loggedIn = this.authenticationService.isLoggedIn();
            }
        
        showlogin() {
                if( this.loggedIn== true){
                    console.log("Login");
                    return true;   
                }else{
                    return false;
                }
            }


}

