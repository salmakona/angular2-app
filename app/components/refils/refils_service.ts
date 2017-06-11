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
           
           //localStorage.refil_items = data;
            localStorage.setItem('refil_items',data);

    }

    x:any[]=[];
    getSubmittedata(){

       var x = localStorage.getItem('refil_items');
        if(typeof(x)=='string'){
            var result = [];
            var s_split = x.split(',')
            for(var i=0;i<s_split.length;i++){
                result.push(""+s_split[i])
            }
            //console.log(result)
            return result
        }
        //return localStorage.refil_items;

    }

    clearRefilsdata(){
        localStorage.removeItem('refil_items')
    }
    
    inventory_Url = "https://api.grabngo.market/api/inventory";
    location_name:any[];
    fixture_name:any;
    processLocation:any[];
    location_data:any;

    locaions:any[]=[];
    location_id:any;
    // for packing slip
    loadinventorydata(location_id:any){ 

        var locations =location_id;
        
        let body = JSON.stringify({locations});
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 
        return this.http.post(this.inventory_Url, body,options).map(this.parsePickingSlip);

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
                        quantity: fixture_name[itemObj]["inventory"],
                        quantityupdate:fixture_name[itemObj]["inventory"],
                        min: fixture_name[itemObj]["min"],
                        max: fixture_name[itemObj]["max"],
                        barcode:fixture_name[itemObj]["barcode"]
                    });     
                }       
            }
            return data

    }


}
