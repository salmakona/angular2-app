import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';



@Injectable()
export class ItemSearchService {

  constructor(private http: Http) {}
  private getUrl ='http://api.grabngo.market/api/items/barcode';

  serch_item(barcode:any){

    let value = barcode;
     console.log(value);
     const url = `${this.getUrl}/${value}`;
      console.log(url);
         return this.http.get('url, JSON.stringify(data), {headers: this.headers})').map(p=>this.extractData).catch(this.handleError);

      }
   private extractData(res:Response) {
          let body = res.json();
          return body || [];
      }

      private handleError(error:any) {
          let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
      }

 
 /*search(term: string): Observable<any> {
      
    return this.http
               .get(`http://api.grabngo.market/api/items/?name=${term}`)
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
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
      }*/
}