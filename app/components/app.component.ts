import {Component,HostBinding} from '@angular/core';
import { Router, Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {LoginComponent} from './login_register/login';
import { AuthenticationService } from './login_register/authentication.service';


@Component({
    selector: 'app',
    templateUrl:'app/components/main.html',
    providers:[AuthenticationService]
})

export class AppComponent {

        
        loggedIn = false;
        constructor(private _router: Router,private authenticationService: AuthenticationService, private route: ActivatedRoute,){

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

