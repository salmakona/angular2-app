"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
var core_1 = require('@angular/core');
var collapse_component_1 = require('./collapse.component');
/*Angular 2 Collapse Example*/
var Angular2Collapse = (function () {
    function Angular2Collapse() {
        //collapse content
        this.isCollapsedContent = false;
        //collapse image (example)
        this.isCollapsedImage = true;
    }
    Angular2Collapse = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n                <h3>Angular 2 Collapse HTML Content</h3>\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"isCollapsedContent = !isCollapsedContent\">Show / Hide Content (Toggle collapse)\n                </button>\n                <hr>\n                <div [collapse]=\"isCollapsedContent\" class=\"card card-block card-header\">\n                  <div class=\"well well-lg\">\n                   HTML content goes here !\n                   <b>bold text</b> <br>\n                   <span>this is a collapse example</span>\n                  </div>\n                </div>\n\n                 <h3>Angular 2 Collapse HTML Content (IMAGE)</h3>\n                 <button type=\"button\" class=\"btn btn-primary\"\n                        (click)=\"isCollapsedImage = !isCollapsedImage\">Show / Hide Image (Toggle collapse)\n                </button>\n                <hr>\n                <div [collapse]=\"isCollapsedImage\" class=\"card card-block card-header\">\n                        <img src=\"http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg\" alt=\"BMW 1\">\n                </div>\n\n             ",
            directives: [collapse_component_1.Collapse],
        })
    ], Angular2Collapse);
    return Angular2Collapse;
}());
exports.Angular2Collapse = Angular2Collapse;
