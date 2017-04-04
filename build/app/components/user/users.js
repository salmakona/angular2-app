"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var UserComponent = (function () {
    function UserComponent() {
        this.jsonURL1 = "http://api.grabngo.market/api/users";
        this.baseURL = "http://api.grabngo.market";
        this.nextURL = "";
        this.prevURL = "";
        this.jsonURL = '';
        this.Item = function Item(_id, phone_num, signup_date, customer_id) {
            this.id = _id;
            this.phone_num = phone_num;
            this.signup_date = signup_date;
            this.customer_id = customer_id;
        };
    }
    UserComponent.prototype.loadJSON = function (file, callback) {
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
    UserComponent.prototype.load = function () {
        var _this = this;
        this.loadJSON(this.jsonURL, function (response) {
            var itemsJson = JSON.parse(response);
            _this.loadItems(itemsJson);
        });
    };
    UserComponent.prototype.loadpagi = function () {
        var _this = this;
        this.loadJSON(this.jsonURL1, function (response) {
            var itemsJson = JSON.parse(response);
            _this.loadItems(itemsJson);
        });
    };
    UserComponent.prototype.loadItems = function (itemsJson) {
        var paginationObj = itemsJson["pagination"];
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
        var itemsObj = itemsJson["users"];
        console.log(itemsObj);
        this.xx = itemsObj;
    };
    UserComponent.prototype.next = function () {
        this.jsonURL1 = this.baseURL + this.nextURL;
        this.loadpagi();
        console.log("Next " + this.jsonURL1);
    };
    UserComponent.prototype.previous = function () {
        this.jsonURL1 = this.baseURL + this.prevURL;
        this.loadpagi();
        console.log("Privious " + this.jsonURL1);
    };
    UserComponent.prototype.ngOnInit = function () {
        this.jsonURL = 'http://api.grabngo.market/api/users';
        this.load();
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'users',
            templateUrl: 'app/components/user/user.html',
            styleUrls: ['app/components/user/user.css'],
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
