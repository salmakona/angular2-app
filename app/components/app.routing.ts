import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home";
import {LocationComponent} from "./location/location";
import {ItemComponent} from "./item/items";
import {UserComponent} from "./user/users";
import {RefilsComponent} from "./refils/refils";
import {TheftcontrolComponent} from "./thef/theftcontrol";
import {ReportComponent} from "./report/report";


const routes: Routes = [
    {path: 'location', component: LocationComponent},
    {path: 'users', component: UserComponent},
    {path: 'refils', component: RefilsComponent},
    {path: 'theftcontrol', component: TheftcontrolComponent},
    {path: 'report', component: ReportComponent},
    {path: 'items', component: ItemComponent},
];

export const routing = RouterModule.forRoot(routes);