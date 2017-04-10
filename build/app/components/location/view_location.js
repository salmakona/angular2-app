"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var ViewLocationComponent = (function () {
    function ViewLocationComponent(http) {
        this.http = http;
        this.baseTerm = "locations";
        this.jsonURL = "https://api.grabngo.market/api/" + this.baseTerm;
        this.baseURL = "https://api.grabngo.market";
        this.nextURL = "";
        this.prevURL = "";
        this.searchTerm = "";
        this.searchURL = this.baseURL + "/api/" + this.baseTerm + "/search/" + this.searchTerm;
        // Loading item//
        this.itemURL = 'https://api.grabngo.market/api/locations';
        this.Item = function Item(_id, customer_id, barcode, description, price, taxable) {
            this.id = _id;
            this.customer_id = customer_id;
            this.barcode = barcode;
            this.description = description;
            this.price = price;
            this.taxable = taxable;
        };
    }
    ViewLocationComponent.prototype.loadJSON = function (file, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    };
    ViewLocationComponent.prototype.loaditem = function () {
        var _this = this;
        this.loadJSON(this.itemURL, function (response) {
            var itemsJson = JSON.parse(response);
            _this.loadItems(itemsJson);
        });
    };
    ViewLocationComponent.prototype.loadItems = function (itemsJson) {
        var locationObj = itemsJson["locations"];
        var itemsObj = locationObj.items;
        for (var index in locationObj) {
            locationObj[index].isExpanded = false;
            locationObj[index].isitemExpanded = false;
            locationObj[index].isinevtoryExpanded = false;
        }
        //let pagiObj = itemsJson["pagination"];
        this.locationx = locationObj;
        this.itemobject = itemsObj;
    };
    //end item//
    ViewLocationComponent.prototype.ngOnInit = function () {
        this.loaditem();
    };
    ViewLocationComponent.prototype.collapse = function (data) {
        data.isExpanded = !data.isExpanded;
    };
    ViewLocationComponent.prototype.itemcollapse = function (data) {
        data.isitemExpanded = !data.isitemExpanded;
    };
    ViewLocationComponent.prototype.inventorycollapse = function (data) {
        data.isinevtoryExpanded = !data.isinevtoryExpanded;
    };
    ViewLocationComponent = __decorate([
        core_1.Component({
            selector: 'viewlocation',
            templateUrl: 'app/components/location/view_location.html',
        })
    ], ViewLocationComponent);
    return ViewLocationComponent;
}());
exports.ViewLocationComponent = ViewLocationComponent;
