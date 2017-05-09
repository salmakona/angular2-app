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
         


}

