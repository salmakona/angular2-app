"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
// Observable class extensions
require('rxjs/add/observable/of');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var forms_1 = require('@angular/forms');
require('rxjs/add/operator/map');
var itemSearchService_1 = require('./itemSearchService');
var ItemSearchComponent = (function () {
    function ItemSearchComponent(itemSearchService, http) {
        this.itemSearchService = itemSearchService;
        this.http = http;
        this.anykeyFilter = new forms_1.FormControl();
        this.getUrl = 'http://api.grabngo.market/api/items/search/';
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
    }
    /*search(event:any, value:string){
        this.itemSearchService.serch_item(anykey)
                .debounceTime(300).distinctUntilChanged()
    
        }
    */
    ItemSearchComponent.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    ItemSearchComponent.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    ItemSearchComponent.prototype.loadJSON = function (file, callback) {
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
    /*Item = function Item(_id:any, label:any, description:any) {

            this.id = this.id;
            this.label = label
            this.description = description;
    };*/
    ItemSearchComponent.prototype.load = function () {
        var _this = this;
        this.loadJSON(this.jsonURL, function (response) {
            var itemsJson = JSON.parse(response);
            _this.loadItems(itemsJson);
        });
    };
    ItemSearchComponent.prototype.loadpagi = function () {
        var _this = this;
        this.loadJSON(this.jsonURL1, function (response) {
            var itemsJson = JSON.parse(response);
            _this.loadItems(itemsJson);
        });
    };
    ItemSearchComponent.prototype.loadItems = function (itemsJson) {
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
    ItemSearchComponent.prototype.next = function () {
        this.jsonURL1 = this.baseURL + this.nextURL;
        this.loadpagi();
        console.log("Next " + this.jsonURL1);
    };
    ItemSearchComponent.prototype.previous = function () {
        this.jsonURL1 = this.baseURL + this.prevURL;
        this.loadpagi();
        console.log("Privious " + this.jsonURL1);
    };
    ItemSearchComponent.prototype.ngOnInit = function () {
        this.jsonURL = 'https://api.grabngo.market/api/items';
        this.load();
        // this.barcodeFilter.valueChanges
        //  this.descriptionFilter.valueChanges
        // .debounceTime(100)
        // .subscribe(value => this.filterCriteria = value,
        // error => console.error(error));
    };
    ItemSearchComponent = __decorate([
        core_1.Component({
            selector: 'item-search',
            templateUrl: 'app/components/item/item-search.component.html',
            providers: [itemSearchService_1.ItemSearchService]
        })
    ], ItemSearchComponent);
    return ItemSearchComponent;
}());
exports.ItemSearchComponent = ItemSearchComponent;
