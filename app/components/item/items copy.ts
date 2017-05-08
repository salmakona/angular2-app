import { Component, OnInit,NgModule,Input,Output } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ItemService }       from './items_service';
import {Http, Response, Headers, RequestOptions}from '@angular/http';
import { Location }               from '@angular/common';
//import {ToasterModule, ToasterService} from 'angular2-toaster';
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";

@Component({

    selector: 'items',
    templateUrl:'app/components/item/items.html',
     //providers: [ToasterService]
})
export class ItemComponent implements OnInit{

    public items:any[];
        key        = 'key';
        keyControl = new FormControl(); 
    //private toasterService: ToasterService;
    constructor (private http: Http, private location: Location) {
        // this.toasterService = toasterService;
         
    }
            
    jsonURL1 = "https://api.grabngo.market/api/items";
    baseURL = "https://api.grabngo.market";
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
        this.jsonURL = 'https://api.grabngo.market/api/items';
        this.load();
    }

        
    dd:string;
    dy:string;  
    submitted = false;
    private getUrl ='https://api.grabngo.market/api/items/id';
    private headers = new Headers({'Content-Type': 'application/json'});

/*update(value: any): Observable<any>{
        console.log("submitted ");
        console.log("Presses"); 
            var x = value.description;
            var y = value.barcode;
            var a = value.price;
            var b = value.taxable;
            var id= value._id;
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

update_value(description:any,barcode:any,price:any,taxable:any,_id:any) {

   this.update(value).subscribe(
       data => {
         // refresh the list
        this.load();
        this.toasterService.pop('success', 'Updated');
         return true;
        
       },
       error => {
         console.error("Error update!");
         return Observable.throw(error);
       }
    );
  }
*/
  
    update(description:any,barcode:any,price:any,taxable:any,_id:any){
            var description = description;
            var barcode= barcode;
            var price = price;
            var taxable = taxable;
            var id = _id;
            var data = {
                "description":description,
                "barcode":barcode,
                "price":price,
                "taxable":taxable,
                "id":id,
            }
            console.log("Updated");
            //console.log(data);
            const url = `${this.getUrl}/${id}`;
            console.log(url);
            return this.http.put(url, JSON.stringify(data), {headers: this.headers}).toPromise().then(
                () => {
                    this.load();
                    //this.toasterService.pop('success', 'Updated');
                }
            )
             .catch(this.handleError);;

    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }   

    private serachUrl ='https://api.grabngo.market/api/items/search';

    filter(event:any,value:any){
        var key = value;

      if(!key){
          this.jsonURL= "https://api.grabngo.market/api/items";
         this.load();
        console.log("This is test");
      }else{
            console.log(key);
            const url = `${this.serachUrl}/${key}`;;
            this.jsonURL= url;
            console.log(this.jsonURL);
            this.load();

      }
  
    }
    
}

