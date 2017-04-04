"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var authentication_service_1 = require('./login_register/authentication.service');
var AppComponent = (function () {
    function AppComponent(_router, authenticationService) {
        this._router = _router;
        this.authenticationService = authenticationService;
        this.loggedIn = false;
        this._router.navigate(["/location"]);
        this.loggedIn = this.authenticationService.isLoggedIn();
    }
    AppComponent.prototype.showlogin = function () {
        if (this.loggedIn == true) {
            console.log("Login salma");
            return true;
        }
        else {
            return false;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/components/main.html',
            // styleUrls:['../app/components/style.css'],
            providers: [authentication_service_1.AuthenticationService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
