import {Component,OnInit,Output,EventEmitter, Input,Directive} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions}from '@angular/http';
import{RefilsService}  from './refils_service';
import { Router, Routes, RouterModule,ActivatedRoute} from '@angular/router';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import{RefilsComponentslip} from './slip';

@Component({
    selector: 'refils',
    templateUrl:'app/components/refils/refils.html',
    providers: [RefilsService]
    
})
export class RefilsComponent implements OnInit{

        isAvailable = true;
        itemid: any;
        id:any;

        constructor(private http: Http,private service: RefilsService,private _router: Router,route: ActivatedRoute){
            this.itemid = route.snapshot.params['id'];
        }
        pagination:any[];
        locations:any[];
        
        private posts:any[] = [];
        private errorMessage:any = '';

        baseURL = "https://api.grabngo.market";
        nextURL = "";
        prevURL = "";
        _id:number;
        xx:any[];
        rjsonURL='';
            
        loadJSONRefils(file:any, callback:any) {   

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

        rload() {

        this.loadJSONRefils(this.rjsonURL,(response:any)=>{
                var itemsJson = JSON.parse(response);
                this.loadItemsrefils(itemsJson)
            });
        }

        loadItemsrefils(itemsJson:any){
                let itemsObj = itemsJson["locations"];
                console.log(itemsObj);
                this.xx=itemsObj;
        }

        /*getPosts() {
            this.service.getData()
                .subscribe(
                    posts => this.posts = posts,
                    error => this.errorMessage = <any>error);
                }
        */ 

        ngOnInit() { 

            this.rjsonURL = 'https://api.grabngo.market/api/locations';
            this.rload();

            //this.getPosts();

        }

        log: string ='';
        selected:any[]=[];

        logCheckbox(element: HTMLInputElement,itemsid:any): any {

                if(element.checked){
                    this.selected.push(element.value);
                }
                else{
                    var index = this.selected.indexOf(element.value);
                    if(index >= 0){
                        this.selected.splice(index, 1);;
                    }
                }
                //this.log += `Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`;
                var value = element.value;
                return value;
                
        }
        submitted = false;
        
        onSubmit(){
            if(this.submitted = true){
                //console.log(this.selected);
                var length = this.selected.length;
                    if(length>0){
                        var id = this.selected;
                        //console.log(length);
                        /*for (let i of id) {
                            console.log(i); 
                        }
                        console.log(id);
                        */
                        for(var i =0; i < id.length;i++){
                            var x = id[i];
                        }
                        //console.log(x);
                    this.service.setSubmittedata(this.selected);
                    this._router.navigate(["/refils-slip"]);  
                        }else{
                            // console.log(length);
                            this._router.navigate(["/refils"]);
                        }
                    //this.isId = this.selected;
                    //this.valueid.emit({value:this.isId});
                
 
                }
            }      


}
