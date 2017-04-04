"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var headers_1 = require('./headers');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.loggedIn = false;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = localStorage.getItem('currentUser.passcode');
    }
    AuthenticationService.prototype.login = function (event, phone_num, passcode) {
        var _this = this;
        //event.preventDefault();
        var body = JSON.stringify({ phone_num: phone_num, passcode: passcode });
        return this.http.post('http://api.grabngo.market/api/auth', body, { headers: headers_1.contentHeaders })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            //console.log(response.json());
            var ee = response.json().ErrorDetails;
            if (ee.Error > 0) {
                console.log("This phone no or password not registred! ");
                return false;
            }
            var user = response.json().user;
            //console.log("Tokon:"+ user._id);
            if (user._id) {
                console.log("HelloTokon");
                // set token property
                _this.token = user.passcode;
                // store user and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ phone_num: phone_num, passcode: passcode, token: user.cc_token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        console.log(this.token);
        return this.loggedIn;
    };
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
