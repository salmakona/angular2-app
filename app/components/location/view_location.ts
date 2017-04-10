import {Component,OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions,Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'viewlocation',
    templateUrl:'app/components/location/view_location.html',
})


export class ViewLocationComponent implements OnInit{
 constructor (private http: Http) {}

    baseTerm = "locations";
    jsonURL = "https://api.grabngo.market/api/" + this.baseTerm;
    baseURL = "https://api.grabngo.market";
    nextURL = "";
    prevURL = "";
    searchTerm = "";
    searchURL = this.baseURL + "/api/" + this.baseTerm + "/search/" + this.searchTerm;



// Loading item//

        itemURL = 'https://api.grabngo.market/api/locations';
        _id:number;
        xx:any[];
        locationx:any[];
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
    
    loaditem() {

       this.loadJSON(this.itemURL,(response:any)=>{
            var itemsJson = JSON.parse(response);
            this.loadItems(itemsJson);
           
        });
    }
itemobject:any[];
    loadItems(itemsJson:any){ 
         let locationObj = itemsJson["locations"];
         let itemsObj = locationObj.items;
          for (let index in locationObj) {
                locationObj[index].isExpanded = false;
                locationObj[index].isitemExpanded = false;
                locationObj[index].isinevtoryExpanded = false;

            }
        //let pagiObj = itemsJson["pagination"];
        this.locationx  =locationObj;
         this.itemobject  =itemsObj;


    }

        
//end item//

 ngOnInit(){

        this.loaditem();
 }
private collapse(data:any) {
       

        data.isExpanded = !data.isExpanded;

      
    } 
private itemcollapse(data:any) {

        data.isitemExpanded = !data.isitemExpanded;

      
    } 
private inventorycollapse(data:any) {
        data.isinevtoryExpanded = !data.isinevtoryExpanded;

      
    } 


}
