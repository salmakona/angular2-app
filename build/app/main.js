"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./components/app.component');
var location_1 = require("./components/location/location");
var users_1 = require("./components/user/users");
var refils_1 = require("./components/refils/refils");
var theftcontrol_1 = require("./components/thef/theftcontrol");
var report_1 = require("./components/report/report");
var items_1 = require("./components/item/items");
var common_1 = require('@angular/common');
var app_routing_1 = require('./components/app.routing');
var login_1 = require('./components/login_register/login');
var register_1 = require('./components/login_register/register');
var auth_guard_1 = require('./components/login_register/auth.guard');
var search_item_1 = require('./components/item/search_item');
var filter_pipe_1 = require("./components/item/filter_pipe");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [app_component_1.AppComponent, location_1.LocationComponent, items_1.ItemComponent, users_1.UserComponent, refils_1.RefilsComponent, theftcontrol_1.TheftcontrolComponent,
                report_1.ReportComponent, login_1.LoginComponent, register_1.Signup, search_item_1.ItemSearchComponent, filter_pipe_1.FilterPipe],
            providers: [
                auth_guard_1.AuthGuard,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
