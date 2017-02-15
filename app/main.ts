import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './components/app.component';
import {LocationComponent} from "./components/location/location";
import {UserComponent} from "./components/user/users";
import {RefilsComponent} from "./components/refils/refils";
import {TheftcontrolComponent} from "./components/thef/theftcontrol";
import {ReportComponent} from "./components/report/report";
import {ItemComponent} from "./components/item/items";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {routing} from './components/app.routing';

@NgModule({
    imports:      [ BrowserModule, routing],
    declarations: [ AppComponent, LocationComponent,ItemComponent,UserComponent,RefilsComponent,TheftcontrolComponent,ReportComponent],
    providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap:    [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);