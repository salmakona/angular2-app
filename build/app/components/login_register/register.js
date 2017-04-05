"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var headers_1 = require('./headers');
var alert_service_1 = require('./alert.service');
var Signup = (function () {
    function Signup(router, http, alertService) {
        this.router = router;
        this.http = http;
        this.alertService = alertService;
    }
    Signup.prototype.signup = function (event, phone_num, passcode) {
        var _this = this;
        event.preventDefault();
        var body = JSON.stringify({ phone_num: phone_num, passcode: passcode });
        console.log(body);
        console.log(this.http.post('https://api.grabngo.market/api/users', body, { headers: headers_1.contentHeaders }));
        return this.http.post('https://api.grabngo.market/api/users', body, { headers: headers_1.contentHeaders })
            .subscribe(function (response) {
            //localStorage.setItem('id_token', response.json().user);
            _this.alertService.success('Registration successful', true);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    Signup = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: 'app/components/login_register/register.html',
            providers: [alert_service_1.AlertService]
        })
    ], Signup);
    return Signup;
}());
exports.Signup = Signup;
