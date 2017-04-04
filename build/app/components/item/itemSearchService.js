"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var ItemSearchService = (function () {
    function ItemSearchService(http) {
        this.http = http;
        this.getUrl = 'https://api.grabngo.market/api/items/barcode';
    }
    ItemSearchService.prototype.serch_item = function (barcode) {
        var _this = this;
        var value = barcode;
        console.log(value);
        var url = this.getUrl + "/" + value;
        console.log(url);
        return this.http.get('url, JSON.stringify(data), {headers: this.headers})').map(function (p) { return _this.extractData; }).catch(this.handleError);
    };
    ItemSearchService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    ItemSearchService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ItemSearchService = __decorate([
        core_1.Injectable()
    ], ItemSearchService);
    return ItemSearchService;
}());
exports.ItemSearchService = ItemSearchService;
