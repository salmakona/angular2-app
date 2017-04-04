"use strict";
var router_1 = require('@angular/router');
var app_component_1 = require("./app.component");
var location_1 = require("./location/location");
var items_1 = require("./item/items");
var users_1 = require("./user/users");
var refils_1 = require("./refils/refils");
var theftcontrol_1 = require("./thef/theftcontrol");
var report_1 = require("./report/report");
var login_1 = require('./login_register/login');
var register_1 = require('./login_register/register');
var auth_guard_1 = require('./login_register/auth.guard');
var search_item_1 = require('./item/search_item');
var routes = [
    { path: 'login', component: login_1.LoginComponent },
    { path: 'signup', component: register_1.Signup },
    { path: 'app', component: app_component_1.AppComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'location', component: location_1.LocationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'users', component: users_1.UserComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'refils', component: refils_1.RefilsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'theftcontrol', component: theftcontrol_1.TheftcontrolComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'report', component: report_1.ReportComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'items', component: items_1.ItemComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'item-search', component: search_item_1.ItemSearchComponent, canActivate: [auth_guard_1.AuthGuard] },
];
exports.routing = router_1.RouterModule.forRoot(routes);
