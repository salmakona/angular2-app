import {Component} from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
@Component({
    selector: 'app',
    templateUrl:'app/components/main.html',
  // styleUrls:['../app/components/style.css'],

})
export class AppComponent {

    constructor(private _router: Router){
        this._router.navigate(["/location"]);
    }
}

