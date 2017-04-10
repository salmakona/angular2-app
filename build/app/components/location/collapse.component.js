"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Collapse = (function () {
    function Collapse() {
        // shown
        this.isExpanded = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
    }
    Object.defineProperty(Collapse.prototype, "collapse", {
        get: function () {
            return this.isExpanded;
        },
        set: function (value) {
            this.isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    Collapse.prototype.toggle = function () {
        if (this.isExpanded) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    Collapse.prototype.hide = function () {
        var _this = this;
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        setTimeout(function () {
            _this.height = '0';
            _this.isCollapse = true;
            _this.isCollapsing = false;
        }, 4);
    };
    Collapse.prototype.show = function () {
        var _this = this;
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        setTimeout(function () {
            _this.height = 'auto';
            _this.isCollapse = true;
            _this.isCollapsing = false;
        }, 4);
    };
    __decorate([
        core_1.HostBinding('style.height')
    ], Collapse.prototype, "height", void 0);
    __decorate([
        core_1.HostBinding('class.in'),
        core_1.HostBinding('attr.aria-expanded')
    ], Collapse.prototype, "isExpanded", void 0);
    __decorate([
        core_1.HostBinding('attr.aria-hidden')
    ], Collapse.prototype, "isCollapsed", void 0);
    __decorate([
        core_1.HostBinding('class.collapse')
    ], Collapse.prototype, "isCollapse", void 0);
    __decorate([
        core_1.HostBinding('class.collapsing')
    ], Collapse.prototype, "isCollapsing", void 0);
    __decorate([
        core_1.Input()
    ], Collapse.prototype, "collapse", null);
    Collapse = __decorate([
        core_1.Directive({ selector: '[collapse]' })
    ], Collapse);
    return Collapse;
}());
exports.Collapse = Collapse;
