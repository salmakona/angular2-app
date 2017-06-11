import {Component,OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions,Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Annimation} from '../animations/animation';


@Component({
    selector: 'viewlocation',
    templateUrl:'app/components/location/view_location.html',
     animations: [Annimation],
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
        xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);  

    }    
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
    
    private configurationcollapse(data:any){data.isconfigurationcollapseExpanded = !data.isconfigurationcollapseExpanded;} 

     open1 = false;hide1 =true;
    private fixturecollapse(data:any){
        data.isfixtureExpanded = !data.isfixtureExpanded;
                if(data.isfixtureExpanded){
                    this.hide1 =false;
                   
                }else{
                    this.hide1 =true;
                    
                }  
        } 

        pacthurl='https://api.grabngo.market/api/inventory/';

        plus(items:any,id:any){
            console.log(id);
             items.inventory++;
            var data ={
                barcode:items.barcode,
                location_id:id,
                count:items.inventory
            }
            let body = JSON.stringify(data);
            console.log(body);
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers }); 
            return this.http.patch(this.pacthurl, body, options).map(this.extractData).subscribe(
                    response => { console.log("Successfully plus");
                     }, error => {this.extractData}
                );

        }

        minus(items:any,id:any){
            if(items.inventory==0){
                return;
            }else{
                items.inventory--;
            }
            console.log(id);
            console.log(items.inventory);
             var data ={
                barcode:items.barcode,
                location_id:id,
                count:items.inventory
            }
            let body = JSON.stringify(data);
            console.log(body);
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers }); 
            return this.http.patch(this.pacthurl, body, options).map(this.extractData).subscribe(
                    response => { console.log("Successfully minus");
                     }, error => {this.extractData}
                );
        }


        minupdate(id:any,items:any){

            console.log("barcode"+items.barcode);
            console.log("min"+items.min);
            console.log("max"+items.max);
            console.log("id"+id);

              var data ={
                barcode:items.barcode,
                location_id:id,
                min:items.min,
                max:items.max,
            }
            let body = JSON.stringify(data);
            console.log(body);
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers }); 
            return this.http.post('https://api.grabngo.market/api/inventory/pars', body, options).map(this.extractData).subscribe(
                    response => { console.log("Successfully updated ");
                     }, error => {this.extractData}
                );

        }


        // private getUrl ='https://api.grabngo.market/api/items/id';

        private headers = new Headers({'Content-Type': 'application/json'});

        update(items:any){

                var data = items;
        //         console.log("Updated");
                console.log(data);
                // const url = `${this.locationURL}/${data._id}`;
                // console.log(url);
                // return this.http.put(this.locationURL, JSON.stringify(data), {headers: this.headers}).toPromise().then(
                //     () => {
                //         this.loadLocation();
                        
                //     }
                // )
                //  .catch(this.handleError);

        }
        itemPriceUpdate(items:any){
        var price = items.price;
            console.log(price);
        }


        private handleError(error:any) {
            let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
        }   

        private extractData(res: Response) {
            let body = res.json();
            return body || {};
        }
}
