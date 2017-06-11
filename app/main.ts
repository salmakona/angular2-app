import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './components/app.component';
import {LocationComponent} from "./components/location/location";
import {UserComponent} from "./components/user/users";
import {RefilsComponent} from "./components/refils/refils";
import {RefilsComponentslip} from "./components/refils/slip";
import {TheftcontrolComponent} from "./components/thef/theftcontrol";
import {ReportComponent} from "./components/report/report";
import {ItemComponent} from "./components/item/items";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {routing} from './components/app.routing';
import {LoginComponent} from './components/login_register/login';
import { Signup } from './components/login_register/register';
import { AuthGuard } from './components/login_register/auth.guard';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService} from './components/login_register/authentication.service';
import { ItemSearchComponent }  from './components/item/search_item';
import {FilterPipe,MyCurrencyPipe,NumberPipe} from "./components/item/filter_pipe";
import {ViewLocationComponent} from "./components/location/view_location";


@NgModule({
    imports:      [ BrowserModule, routing,HttpModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule],
    declarations: [ AppComponent, LocationComponent,ItemComponent,ItemSearchComponent, 
    FilterPipe,MyCurrencyPipe,NumberPipe,UserComponent,RefilsComponent,TheftcontrolComponent,
    ReportComponent,LoginComponent,Signup,ViewLocationComponent,RefilsComponentslip],
    providers:[
        AuthGuard,
        {provide: LocationStrategy, useClass: HashLocationStrategy}],
    exports:[],
    bootstrap:    [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);