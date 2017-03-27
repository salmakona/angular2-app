import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
=======
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
>>>>>>> 843cb06f9dce783b300bd924fd385b6b56c37440
import { AppComponent }  from './components/app.component';
import {LocationComponent} from "./components/location/location";
import {UserComponent} from "./components/user/users";
import {RefilsComponent} from "./components/refils/refils";
import {TheftcontrolComponent} from "./components/thef/theftcontrol";
import {ReportComponent} from "./components/report/report";
import {ItemComponent} from "./components/item/items";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {routing} from './components/app.routing';
<<<<<<< HEAD

@NgModule({
    imports:      [ BrowserModule, routing],
    declarations: [ AppComponent, LocationComponent,ItemComponent,UserComponent,RefilsComponent,TheftcontrolComponent,ReportComponent],
    providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
=======
import {LoginComponent} from './components/login_register/login';
import { Signup } from './components/login_register/register';
import { AuthGuard } from './components/login_register/auth.guard';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService} from './components/login_register/authentication.service';

@NgModule({
    imports:      [ BrowserModule, routing,HttpModule,FormsModule],
    declarations: [ AppComponent, LocationComponent,ItemComponent,UserComponent,RefilsComponent,TheftcontrolComponent,ReportComponent,LoginComponent,Signup],
    providers:[
        AuthGuard,
        {provide: LocationStrategy, useClass: HashLocationStrategy}],
>>>>>>> 843cb06f9dce783b300bd924fd385b6b56c37440
    bootstrap:    [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);