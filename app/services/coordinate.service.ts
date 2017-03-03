import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';

import {Sweep} from './../models/sweep';

@Injectable()
export class CoordinateService {

    constructor(private http: Http) {
    }

    getSweepsForOperation(operationId: string): Observable<Sweep[]> {
        console.log();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0YmYyYWMzMC1mZjcxLTExZTYtYjViOC0zZDkwNGM3M2EzNTgiLCJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvdjFcL2xvZ2luIiwiaWF0IjoxNDg4NTUwNjA3LCJleHAiOjE0ODk3NjAyMDcsIm5iZiI6MTQ4ODU1MDYwNywianRpIjoiMWY5YjNiNzUyNGQxNjU0YzM1YjQ4ZmUwYzg0MDZjMzEifQ.8UVnSbtDQugzYdABmLtjwGDAgCoBDtNSMuuh4hKLGys');

        return this.http.get('http://localhost:8000/v1/operations/' + operationId + '/sweeps', {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): any {
        let body = res.json().map(Sweep.fromObject);
        return body || {};
    }

    private handleError(error: Response | any) {
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
