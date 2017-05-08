import {Component,OnInit,Output,EventEmitter,Input,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions}from '@angular/http';
import{RefilsComponent} from './refils';
import{RefilsService}  from './refils_service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Component({
    
    selector: 'refils-slip',
    templateUrl:'app/components/refils/slip.html',
    //directives:[RefilsComponent]
    providers: [RefilsService]
})

export class RefilsComponentslip implements OnInit,OnDestroy{
    
    data:any
    private posts:any = [];
    private id:any = [];
    private location:any[] = [];
    xx: any[];
    constructor(private route: ActivatedRoute, private service: RefilsService,private http: Http) {}

        ngOnInit() {

            console.log(this.service.getSubmittedata());
           this.id =this.service.getSubmittedata();
           //this.loadTest();
          this.service.loadata().subscribe(posts=>this.posts=posts);
           
            //console.log(this.posts);

        }

        private extractData(res:Response) {
            let body = res.json();
            return body || [];
        }

        ngOnDestroy(){
            this.service.clearRefilsdata();
             console.log(this.service.getSubmittedata());

        } 
        plus(item:any){
            item.quantity++;

        }
        minus(item:any){
            if(item.quantity==0){
                return;
            }else{
                item.quantity--;
            }
        }
        locationx:any[];
        open = false;hide =false;
        overflow = true;
         /*private collapse(data:any){data.isExpanded = !data.isExpanded;
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
        } */
        private collapse(data:any){
            data.isExpanded = !data.isExpanded;

        }
        private itemcollapse(data:any){data.isitemExpanded = !data.isitemExpanded;}
        private inventorycollapse(data:any){data.isinevtoryExpanded = !data.isinevtoryExpanded;} 

}

