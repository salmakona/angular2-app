"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var http_1 = require('@angular/http');
var ItemComponent = (function () {
    function ItemComponent(http, location) {
        this.http = http;
        this.location = location;
        this.descriptionFilter = new forms_1.FormControl();
        this.jsonURL1 = "https://api.grabngo.market/api/items";
        this.baseURL = "https://api.grabngo.market";
        this.nextURL = "";
        this.prevURL = "";
        this.jsonURL = '';
        this.Item = function Item(_id, customer_id, barcode, description, price, taxable) {
            this.id = _id;
            this.customer_id = customer_id;
            this.barcode = barcode;
            this.description = description;
            this.price = price;
            this.taxable = taxable;
        };
        this.submitted = false;
        this.getUrl = 'https://api.grabngo.market/api/items/id';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    ItemComponent.prototype.loadJSON = function (file, callback) {
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
    ItemComponent.prototype.load = function () {
        var _this = this;
        this.loadJSON(this.jsonURL, function (response) {
            var itemsJson = JSON.parse(response);
            _this.loadItems(itemsJson);
        });
    };
    ItemComponent.prototype.loadpagi = function () {
        var _this = this;
        this.loadJSON(this.jsonURL1, function (response) {
            var itemsJson = JSON.parse(response);
            _this.loadItems(itemsJson);
        });
    };
    ItemComponent.prototype.loadItems = function (itemsJson) {
        var paginationObj = itemsJson["pagination"];
        //console.log("Test"+paginationObj);
        if (paginationObj != null) {
            this.nextURL = paginationObj["next_page_endpoint"];
            this.prevURL = paginationObj["prev_page_endpoint"];
            var total_items = paginationObj["total_records"];
            var total_items_text = document.getElementById("total_items_text");
            total_items_text.innerHTML = "Total Items: " + total_items;
            var current_page = paginationObj["current_page"];
            var current_page_text = document.getElementById("current_page");
            current_page_text.innerHTML = current_page;
        }
        // We've got our items.  Let's parse and update the table!
        var itemsObj = itemsJson["items"];
        console.log(itemsObj);
        this.xx = itemsObj;
    };
    ItemComponent.prototype.next = function () {
        this.jsonURL1 = this.baseURL + this.nextURL;
        this.loadpagi();
        console.log("Next " + this.jsonURL1);
    };
    ItemComponent.prototype.previous = function () {
        this.jsonURL1 = this.baseURL + this.prevURL;
        this.loadpagi();
        console.log("Privious " + this.jsonURL1);
    };
    ItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jsonURL = 'https://api.grabngo.market/api/items';
        this.load();
        this.descriptionFilter.valueChanges
            .debounceTime(100)
            .subscribe(function (value) { return _this.filterCriteria = value; }, function (error) { return console.error(error); });
    };
    ItemComponent.prototype.update = function (formValue) {
        console.log("submitted update  from");
        console.log("Update Button Clicked");
        var x = formValue.description;
        var y = formValue.barcode;
        var a = formValue.price;
        var b = formValue.taxable;
        var id = formValue._id;
        this.dy = y;
        var data = {
            "description": x,
            "barcode": y,
            "price": a,
            "taxable": b,
            "id": id,
        };
        console.log("Onclick");
        console.log(data);
        var url = this.getUrl + "/" + id;
        console.log(url);
        return this.http.put(url, JSON.stringify(data), { headers: this.headers }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    ItemComponent.prototype.update_value = function (formValue) {
        var _this = this;
        this.update(formValue).subscribe(function (data) {
            // refresh the list
            _this.load();
            return true;
        }, function (error) {
            console.error("Error update!");
            return Observable_1.Observable.throw(error);
        });
    };
    ItemComponent.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ItemComponent = __decorate([
        core_1.Component({
            selector: 'items',
            templateUrl: 'app/components/item/items.html',
        })
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
