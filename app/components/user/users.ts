import {Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import {Http, Response, Headers, RequestOptions}from '@angular/http';
import {Annimation} from '../animations/animation';


@Component({
    selector: 'users',
    templateUrl:'app/components/user/user.html',
    animations: [Annimation]
})

export class UserComponent {

        jsonURL1 = "https://api.grabngo.market/api/users";
        baseURL = "https://api.grabngo.market";
        nextURL = "";
        prevURL = "";
        _id:number;
        xx:any[];
        jsonURL='';

        constructor(private http:Http){}
    
        loadJSONUser(file:any, callback:any) {    
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

        Item = function Item(_id:any, phone_num:any, signup_date:any, customer_id:any) {
            this.id = _id;
            this.phone_num = phone_num;
            this.signup_date = signup_date;
            this.customer_id = customer_id;
        };

        load() {

        this.loadJSONUser(this.jsonURL,(response:any)=>{
                var itemsJson = JSON.parse(response);
                this.loadItems(itemsJson)
            });
            
        }

        loadpagi() {

        this.loadJSONUser(this.jsonURL1,(response:any)=>{
                var itemsJson = JSON.parse(response);
                this.loadItems(itemsJson)
            });
            
            
        }


        loadItems(itemsJson:any){

            let paginationObj = itemsJson["pagination"];
            if(paginationObj != null)
                {
                    this.nextURL = paginationObj["next_page_endpoint"];
                    this.prevURL = paginationObj["prev_page_endpoint"];
                    var total_items = paginationObj["total_records"];
                    var total_items_text = document.getElementById("total_items_text");
                    total_items_text.innerHTML = "Total Users: " + total_items;
                    var current_page = paginationObj["current_page"];
                    var current_page_text = document.getElementById("current_page");
                    current_page_text.innerHTML = current_page;
                }
                // We've got our items.  Let's parse and update the table!
                let itemsObj = itemsJson["users"];
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
            this.jsonURL = 'https://api.grabngo.market/api/users';
            this.load();

        }

        private getUrl ='https://api.grabngo.market/api/users/id';
        private headers = new Headers({'Content-Type': 'application/json'});

        /*update(phonenum:any,balance:any,passcode:any,userid:any){
            var phonenum = phonenum;
            var balance= balance;
            var passcode = passcode;
            var userid = userid;
            console.log(userid);
            var data = {
                "phone_num":phonenum,
                "balance":balance,
                "passcode":passcode,
                "id":userid,
            }
            console.log(data);
            const url = `${this.getUrl}/${userid}`;
            console.log(url);
            return this.http.put(url, JSON.stringify(data), {headers: this.headers}).toPromise().then(
                () => {
                    this.load();
                    //this.toasterService.pop('success', 'Updated');
                }
            )
                .catch(this.handleError);;

        }*/
        // customer_id:any;
        // phone_num:any;
        balance:any;
      
        update(post:any){
            var data = post;
            console.log(data);
            const url = `${this.getUrl}/${post._id}`;
            console.log(url);
            return this.http.put(url, JSON.stringify(data), {headers: this.headers}).toPromise().then(
                () => {
                    this.load();
                    
                }
            )
            .catch(this.handleError);

        }   

        //  balance:any;
        blanceUpdate(post:any){
            var str =  post.balance.toString();
            var balance1 = str.substring(1);
            console.log(balance1);

                var balance={
                    balance:balance1,
                }
            console.log(balance);

            const url = `${this.getUrl}/${post._id}`;
                console.log(url);
                return this.http.put(url, JSON.stringify(balance), {headers: this.headers}).toPromise().then(
                    () => {
                        this.load();
                        
                    }
                )
                .catch(this.handleError);
        }

        phoneUpdate(post:any){
            var number = post.phone_num.toString();
            // console.log(number);
            var phone_num = number.substring(1,4)+number.substring(6,9)+number.substring(10,14);
            // console.log(phone_num);

                var phone={
                    phone_num:phone_num,
                }
            console.log(phone);

            const url = `${this.getUrl}/${post._id}`;
                console.log(url);
                return this.http.put(url, JSON.stringify(phone), {headers: this.headers}).toPromise().then(
                    () => {
                        this.load();
                        
                    }
                )
                .catch(this.handleError);
        }

        private handleError(error:any) {
            let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
        }  

        private serachUrl ='https://api.grabngo.market/api/users/search';
        item:any[];

        filter(event:any,value:any){
            var key = value;

        if(!key){
            this.jsonURL= "https://api.grabngo.market/api/users";
            this.load();
            console.log("This is test");
        }else{
            console.log(key);
            const url = `${this.serachUrl}/${key}`;
            this.jsonURL= url;
            console.log(this.jsonURL);
            this.load();
        }
    
        } 

}
