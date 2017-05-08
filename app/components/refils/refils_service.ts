import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions,Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class RefilsService {

    submitted_data : any[];
    url:'https://api.grabngo.market/api/locations';
    constructor (private http: Http) {}

    getData():Observable<any[]> {
        return this.http.get('https://api.grabngo.market/api/locations')
        .map(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
     
    setSubmittedata(data:any){

           localStorage.refil_items = data;

    }

    getSubmittedata(){

           return localStorage.refil_items;

    }
    clearRefilsdata(){
        localStorage.removeItem('refil_items')
    }
    
    inventory_Url = "https://api.grabngo.market/api/inventory";
    location_name:any[];
    fixture_name:any;
    processLocation:any[];
    location_data:any;

    /*loadJSON(file:any, callback:any){   
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('POST', file, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4) {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);  
    }

    load(){
            this.loadJSON(this.jsonURL, function(response:any)=> {
                    var pickingSlipJson = JSON.parse(response);
                    this.parsePickingSlip(pickingSlipJson)
                });
                
    }*/

    loadata(){
        return this.http.post(this.inventory_Url,(response:any)=>{               
                }).map(this.parsePickingSlip);
    }

    locaion_name_list:any[]=[];

    private parsePickingSlip(response:any)
    {
        // console.log(response._body);
        var pickingSlipJson = JSON.parse(response._body);
        var data = [];
        var location_data = {};
        var fixture_data:any = [];
        var item_data:any =[];
        //console.log("Hello Salma"+pickingSlipJson);

            for (var location_name in pickingSlipJson) 
            {  
                var location_id = pickingSlipJson[location_name]["location_id"];

                if(location_name != "picking_slip")
                {
                    processLocation(pickingSlipJson[location_name]);
                    location_data = {
                            name:location_name,
                            id:location_id,
                            fixtures: fixture_data
                        }
                    data.push(location_data)
                    fixture_data = []
                    location_data = {}
                }
            }

            function processLocation(location_name:any)
            {
                for (var fixture_name in location_name) 
                {  
                    if(fixture_name == "picking_slip" || fixture_name == 'location_id') continue 
                    var fix_row : any;        
                    //console.log("\t\tThe name of this fixture is: " + fixture_name);
                    processFixture(location_name[fixture_name]["items"]);
                    // console.log('------'+fixture_name)
                    // console.log(item_data)
                    fix_row = {
                        name: fixture_name,
                        items: item_data
                    }
                    fixture_data.push(fix_row);
                    item_data = [];
                }
            }

            function processFixture(fixture_name:any)
            {
                
                //for(i = 0; i<fixture_name.length; i++)
                //{
                    //var itemObj = fixture_name[i];
                    //console.log("\t\tThe name of this item is: " + itemObj["description"]);

                //}
                //console.log("ItemsAr: " + fixture_name);
                for (var itemObj in fixture_name) 
                {   
                    item_data.push({
                        name:fixture_name[itemObj]["description"],
                        quantity: fixture_name[itemObj]["inventory"]
                    });     
                }       
            }
            return data

    }


}
