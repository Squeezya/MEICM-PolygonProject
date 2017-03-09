import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RestObject} from "../models/RestObject";

@Injectable()
export class RestService {

    constructor(protected http: Http) {
    }

    protected extractData(res: Response, mapFunc: Function): any {
        let body = res.json();
        return mapFunc(body);
    }

    protected extractDataArray<T>(res: Response, mapFunc: Function): any {
        let jsonResponse = res.json();
        let restObject = new RestObject<T>();
        restObject.total = jsonResponse.total;
        restObject.per_page = jsonResponse.per_page;
        restObject.current_page = jsonResponse.current_page;
        restObject.last_page = jsonResponse.last_page;
        restObject.from = jsonResponse.from;
        restObject.to = jsonResponse.to;
        restObject.items = jsonResponse.data.map(mapFunc);
        return restObject;
    }

    protected handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
