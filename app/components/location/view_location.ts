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
    constructor (private http: Http){ }
    baseTerm = "locations";
    jsonURL = "https://api.grabngo.market/api/" + this.baseTerm;
    baseURL = "https://api.grabngo.market";
    nextURL = "";
    prevURL = "";
    searchTerm = "";
    searchURL = this.baseURL + "/api/" + this.baseTerm + "/search/" + this.searchTerm;
    overflow = true;
    locationURL = 'https://api.grabngo.market/api/locations';
    _id:number;xx:any[]; 
    locationx:any[];

    loadJSONLocation(file:any, callback:any){
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onreadystatechange = function(){
            if (xobj.readyState == 4){
                callback(xobj.responseText);
            }
        };xobj.send(null);
    }

    /*  Item = function Item(_id:any, customer_id:any, barcode:any, description:any, price:any, taxable:any){
                    this.id = _id;
                    this.customer_id = customer_id
                    this.barcode = barcode;
                    this.description = description;
                    this.price = price;
                    this.taxable = taxable;
            
        }*/
    
        loadLocation() {
            this.loadJSONLocation(this.locationURL,(response:any)=>{
                var itemsJson1 = JSON.parse(response);
                this.loadItems(itemsJson1);
            });
        }

        itemobject:any[];
        loadItems(itemsJson1:any){
            let paginationObj = itemsJson1["pagination"];

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
            
            let locationObj=itemsJson1["locations"];
            let itemsObj=locationObj.items;
            for (let index in locationObj){
                    locationObj[index].isExpanded = false;
                    locationObj[index].isitemExpanded = false;
                    locationObj[index].isinevtoryExpanded = false;
            }
            let pagiObj = itemsJson1["pagination"];
            this.locationx = locationObj;
            this.itemobject = itemsObj;

         }
            loadpagi() {

            this.loadJSONLocation(this.jsonURL,(response:any)=>{
                    var itemsJson = JSON.parse(response);
                    this.loadItems(itemsJson)
                });
            }

        next() {
                
            this.jsonURL = this.baseURL+this.nextURL;
            this.loadpagi();
            console.log("Next "+this.jsonURL);
                
        }

        previous() {
            this.jsonURL = this.baseURL+this.prevURL;
            this.loadpagi();
            console.log("Privious "+this.jsonURL);
        }

        ngOnInit(){
            this.locationURL = 'https://api.grabngo.market/api/locations';
            this.loadLocation();
        }
        open = false;hide =false;
        private collapse(data:any){data.isExpanded = !data.isExpanded;
                for(var i=0; i<this.locationx.length; i++){
                    if(data._id != this.locationx[i]._id){
                        if(data.isExpanded){
                            this.overflow = false;
                            this.locationx[i].hide =true;
                        }else{
                            this.overflow = true;
                            this.locationx[i].hide =false;
                        }
                    }
                }
        } 

    private itemcollapse(data:any){data.isitemExpanded = !data.isitemExpanded;}

    private inventorycollapse(data:any){data.isinevtoryExpanded = !data.isinevtoryExpanded;} 
}
