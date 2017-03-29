import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions,Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class ItemService {

    constructor (private http: Http) {}

      getData():Observable<any[]> {
          return this.http.get('api.grabngo.market/api/items')
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
      }
}