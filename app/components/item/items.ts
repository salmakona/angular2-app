import { Component, OnInit,NgModule,Input,Output } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ItemService }       from './items_service';
import {Http, Response, Headers, RequestOptions}from '@angular/http';
import { Location }               from '@angular/common';

@Component({

    selector: 'items',
    templateUrl:'app/components/item/items.html',
})
export class ItemComponent implements OnInit{

    public items:any[];
    public descriptionFilter: FormControl = new FormControl();
    public filterCriteria: string;

    constructor (private http: Http, private location: Location) {}
            
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
    }

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
        this.descriptionFilter.valueChanges
        .debounceTime(100)
            .subscribe(value => this.filterCriteria = value,
        error => console.error(error));

    }

        
    dd:string;
    dy:string;  
    submitted = false;
    private getUrl ='http://api.grabngo.market/api/items/id';
    private headers = new Headers({'Content-Type': 'application/json'});

    update(formValue: any): Observable<any>{
        console.log("submitted update  from");
        console.log("Update Button Clicked"); 
            var x = formValue.description;
            var y = formValue.barcode;
            var a = formValue.price;
            var b = formValue.taxable;
            var id= formValue._id;
            this.dy = y;
            var data = {
                "description":x,
                "barcode":y,
                "price":a,
                "taxable":b,
                "id":id,
            }
            console.log("Onclick");         
            console.log(data);
            const url = `${this.getUrl}/${id}`;
            console.log(url);
            return this.http.put(url, JSON.stringify(data), {headers: this.headers}).map((res: Response) => res.json()).catch(this.handleError);

    }

update_value(formValue: any) {
    this.update(formValue).subscribe(
       data => {
         // refresh the list
        this.load();
         return true;
       },
       error => {
         console.error("Error update!");
         return Observable.throw(error);
       }
    );
  }
  
        
    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    
    
}

