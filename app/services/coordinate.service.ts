import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';

import {AppSettings} from '../config/app.service';

import {Sweep} from '../models/sweep';

@Injectable()
export class CoordinateService {

    constructor(private http: Http) {
    }

    getSweepsForOperation(operationId: string): Observable<Sweep[]> {
        console.log();
        let headers = new Headers();
        headers.append('Authorization', AppSettings.TOKEN);

        return this.http.get(AppSettings.API_ENDPOINT + AppSettings.API_VERSION +
            'operations/' + operationId + '/sweeps', {headers: headers}
        ).map(this.extractData)
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
