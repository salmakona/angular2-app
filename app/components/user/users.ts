import {Component} from '@angular/core';
@Component({
    selector: 'users',
    templateUrl:'app/components/user/user.html'
})

export class UserComponent {

    jsonURL1 = "https://api.grabngo.market/api/users";
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

    Item = function Item(_id:any, phone_num:any, signup_date:any, customer_id:any) {

        this.id = _id;
        this.phone_num = phone_num;
        this.signup_date = signup_date;
        this.customer_id = customer_id;
    };

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
}
