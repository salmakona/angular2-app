"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ToastComponent = (function () {
    function ToastComponent(toastService) {
        var _this = this;
        this.toastService = toastService;
        this.defaults = {
            title: '',
            message: 'May the Force be with You'
        };
        this.toastSubscription = this.toastService.toastState.subscribe(function (toastMessage) {
            console.log("activiting toast: " + toastMessage.message);
            _this.activate(toastMessage.message);
        });
    }
    ToastComponent.prototype.activate = function (message, title) {
        if (message === void 0) { message = this.defaults.message; }
        if (title === void 0) { title = this.defaults.title; }
        this.title = title;
        this.message = message;
        this.show();
    };
    ToastComponent.prototype.ngOnInit = function () {
        this.toastElement = document.getElementById('toast');
    };
    ToastComponent.prototype.ngOnDestroy = function () {
        this.toastSubscription.unsubscribe();
    };
    ToastComponent.prototype.show = function () {
        var _this = this;
        console.log(this.message);
        this.toastElement.style.opacity = 1;
        this.toastElement.style.zIndex = 9999;
        window.setTimeout(function () { return _this.hide(); }, 2500);
    };
    ToastComponent.prototype.hide = function () {
        var _this = this;
        this.toastElement.style.opacity = 0;
        window.setTimeout(function () { return _this.toastElement.style.zIndex = 0; }, 400);
    };
    ToastComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'story-toast',
            templateUrl: './toast.component.html',
            styleUrls: ['./toast.component.css']
        })
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/ 
