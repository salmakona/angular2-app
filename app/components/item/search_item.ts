import { Component,Input, Injectable, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {FormControl,FormsModule} from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import { ItemSearchService }       from './itemSearchService';

@Component({
  selector: 'item-search',
  templateUrl: 'app/components/item/item-search.component.html',
  providers: [ItemSearchService]
})

export class ItemSearchComponent {

    public items:any[];
    public barcodeFilter: FormControl = new FormControl();
     public descriptionFilter: FormControl = new FormControl();
    public filterCriteria: string;

constructor(private itemSearchService: ItemSearchService,private http: Http) {}

private getUrl ='http://api.grabngo.market/api/items/barcode';

search(event:any, barcode:string){
    this.itemSearchService.serch_item(barcode)
            .debounceTime(300).distinctUntilChanged()

    }

   private extractData(res:Response) {
          let body = res.json();
          return body || [];
      }

      private handleError(error:any) {
          let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
      }

    
    jsonURL1 = "http://api.grabngo.market/api/items";
    baseURL = "http://api.grabngo.market";
    nextURL = "";
    prevURL = "";
    _id:number;
     xx:any[];
     jsonURL='';
     

    loadJSON(file:any, callback:any) {    
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

    }

   Item = function Item(_id:any, customer_id:any, barcode:any, description:any, price:any, taxable:any) {

    this.id = _id;
    this.customer_id = customer_id
    this.barcode = barcode;
    this.description = description;
    this.price = price;
    this.taxable = taxable;
};

    /*Item = function Item(_id:any, label:any, description:any) {

            this.id = this.id;
            this.label = label
            this.description = description;
    };*/

    load() {

       this.loadJSON(this.jsonURL,(response:any)=>{
            var itemsJson = JSON.parse(response);
            this.loadItems(itemsJson)
        });
    }

    loadpagi() {

       this.loadJSON(this.jsonURL1,(response:any)=>{
            var itemsJson = JSON.parse(response);
            this.loadItems(itemsJson)
        });
    }

    loadItems(itemsJson:any){

                let paginationObj = itemsJson["pagination"];
                //console.log("Test"+paginationObj);
                if(paginationObj != null)
                    {
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
                    let itemsObj = itemsJson["items"];
                    console.log(itemsObj);
                    this.xx=itemsObj;
    }
 
     next() {
            
            this.jsonURL1 = this.baseURL+this.nextURL;
            this.loadpagi();
            console.log("Next "+this.jsonURL1);
            
    }

    previous() {
            this.jsonURL1 = this.baseURL+this.prevURL;
            this.loadpagi();
             console.log("Privious "+this.jsonURL1);
        }

        ngOnInit(){

            this.jsonURL = 'http://api.grabngo.market/api/items';
            this.load();
            this.barcodeFilter.valueChanges
             this.descriptionFilter.valueChanges
            .debounceTime(100)
             .subscribe(value => this.filterCriteria = value,
            error => console.error(error));

        }
        
    



}