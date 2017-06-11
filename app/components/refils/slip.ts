import {Component,OnInit,Output,EventEmitter,Input,OnDestroy} from '@angular/core';
import { Router, Routes, RouterModule,ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions}from '@angular/http';
import{RefilsComponent} from './refils';
import{RefilsService}  from './refils_service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {trigger, state, style, animate, transition } from '@angular/core';

@Component({
    
    selector: 'refils-slip',
    templateUrl:'app/components/refils/slip.html',
    //directives:[RefilsComponent]
    providers: [RefilsService]
})

export class RefilsComponentslip implements OnInit,OnDestroy{
    data:string;
    private posts:any = [];
    private id:any = [];
    private location:any[] = [];
    xx: any[];
     x:string[]=[];
    //   showHide:boolean;
    constructor(private route: ActivatedRoute, private service: RefilsService,private http: Http,private _router: Router) {
            // this.showHide = true;

    }

        ngOnInit() {
            //console.log("slip");
           // console.log(this.service.getSubmittedata());

            this.id =this.service.getSubmittedata();
            var locations = this.id;
            //this.service.loadinventorydata().subscribe(posts=>this.posts=posts);
            this.service.loadinventorydata(locations).subscribe(posts=>this.posts=posts);
        }

        ngOnDestroy(){
            this.service.clearRefilsdata();
             console.log(this.service.getSubmittedata());

        } 

        plus(item:any){
            item.quantityupdate++;
        }

        minus(item:any){
            if(item.quantityupdate==0){
                return;
            }else{
                item.quantityupdate--;
            }
            // item.quantityupdate--;
        }

       open = false;hide =true;
         private collapse(data:any){
             
            data.isExpanded = !data.isExpanded;
            if(data.isExpanded){
                this.hide =false;
            }else{
                this.hide =true;
            }
            
        }
                
        open1 = false;hide1 =true;
          private fixturecollapse(data:any){

                data.isfixtureExpanded = !data.isfixtureExpanded;
                if(data.isfixtureExpanded){
                    this.hide1 =false;
                }else{
                    this.hide1 =true;
                }  
        } 

        /*checkId(id:any){
            console.log(id);
        }*/

        item:any[]= [];
        name1:any;
        updateQuantity1:any;
        max1:any;
        min1:any;
        description1:any;
        location_id1:any;
        items:any[]=[];
        bercode:any;
      

        confirm_slip(location:any){
            // console.log(location);
            for(let i = 0, l = location.fixtures.length; i < l; i++) {
                //  console.log(location.fixtures);
                var obj = location.fixtures[i];
                //console.log(obj);
                var name = obj.name;
                // console.log(obj.name);
               for(let x =0; x<obj.items.length; x++){
                      var objitem = obj.items[x];
                      //console.log(objitem);
                     
                      if(objitem.quantityupdate != objitem.quantity){
                           
                            this.name1 = obj.name;
                            this.updateQuantity1 = objitem.quantityupdate;
                            this.max1 = objitem.max;
                            this.min1 = objitem.min;
                            this.description1 = objitem.name;
                            var location_id = location.id;

                            this.items.push({
                                name:this.name1,
                                quantity:this.updateQuantity1,
                                max: objitem.max,
                                min: objitem.min,
                                barcode:objitem.barcode
                                });

                                //console.log(this.items);

                      }

               }

            }
            var url ="https://api.grabngo.market/api/inventory/confirm";
            var items:any = this.items; 
            let body = JSON.stringify({location_id,items});
            console.log(body);
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers }); 
                return this.http.post(url,body,options).map((res:Response) => res.json())
                .subscribe(
                    response => { console.log(" Successfully post");
                    location.isExpanded = !location.isExpanded;
                     }, error => {this.extractData}
                );
        }

        private handleError(error:any) {
            let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
            return Observable.throw(errMsg);
        }

        private extractData(res:Response) {
            let body = res.json();
            return body || [];
        }


        print(): void {
            let printContents, popupWin;
            printContents = document.getElementById('print-section').innerHTML;
            popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
            popupWin.document.open();
            popupWin.document.write(`
            <html>
                <head>
                <title>Print tab</title>
                <style>
                //........Customized style.......
                </style>
                </head>
           <body onload="window.print();window.close()">${printContents}</body>
            </html>`
            );
            popupWin.document.close();
        }

        location_name: string;
        items2:any[]=[];
        objitem:any[]=[];
        object:any[];
        name:any[]=[];
        items3:any[]=[];
        xyz:any[];

        print_slip(location:any,name:any){
             //console.log(name);
             this.location_name = name;
             //console.log(location.fixtures.length);

                for(let i = 0, l = location.fixtures.length; i < l; i++) {
                    //console.log(location.fixtures);
                    var obj = location.fixtures[i];

                    // this.items2.push(obj);
                    //  console.log(this.items2);
                  
                    this.xyz=obj;
                    console.log(this.xyz);
                    this.items2.push(obj);

                   
                    //  this.items3.push(this.xyz);
                    //   console.log(this.items3);
                    // // console.log(this.items2);
                    for(let x =0; x<this.items2.length; x++){
                            this.objitem = obj.items[x];
                            console.log(this.objitem);
                             this.items3.push(this.objitem);
                           

                    }

                }
        }
}

