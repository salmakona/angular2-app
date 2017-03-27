import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home";
import {LocationComponent} from "./location/location";
import {ItemComponent} from "./item/items";
import {UserComponent} from "./user/users";
import {RefilsComponent} from "./refils/refils";
import {TheftcontrolComponent} from "./thef/theftcontrol";
import {ReportComponent} from "./report/report";
import {LoginComponent} from './login_register/login';
import { Signup } from './login_register/register';
import { AuthGuard } from './login_register/auth.guard';
 import { AuthHttp } from 'angular2-jwt';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
   { path: 'signup', component: Signup },
   {path: 'location', component: LocationComponent}
    //{ path: 'location',   component: LocationComponent, canActivate: [AuthGuard] },
     //{ path: '**',     component: LoginComponent },

      
    /*{path: 'location', component: LocationComponent},
    {path: 'users', component: UserComponent},
    {path: 'refils', component: RefilsComponent},
    {path: 'theftcontrol', component: TheftcontrolComponent},
    {path: 'report', component: ReportComponent},
    {path: 'items', component: ItemComponent},
    { path: 'login',component: LoginComponent },
    { path: 'signup', component: Signup }*/
  
    
];

export const routing = RouterModule.forRoot(routes);