"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
//import { throwIfAlreadyLoaded } from '../module-import-guard';
var toast_component_1 = require('./toast.component');
var toast_service_1 = require('./toast.service');
var ToastModule = (function () {
    function ToastModule(parentModule) {
        //throwIfAlreadyLoaded(parentModule, 'ToastModule')
    }
    ToastModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [toast_component_1.ToastComponent],
            declarations: [toast_component_1.ToastComponent],
            providers: [toast_service_1.ToastService]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf())
    ], ToastModule);
    return ToastModule;
}());
exports.ToastModule = ToastModule;
/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/ 
