import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';

import {AppSettings} from '../config/app.service';

import {Sweep} from '../models/sweep';
import {RestService} from "./rest.service";

@Injectable()
export class CoordinateService extends RestService {

    constructor(http: Http) {
        super(http);
    }

    getSweepsForOperation(operationId: string): Observable<Sweep[]> {
        let headers = new Headers();
        headers.append('Authorization', AppSettings.TOKEN);

        return this.http.get(AppSettings.API_ENDPOINT + AppSettings.API_VERSION +
            'operations/' + operationId + '/sweeps', {headers: headers}
        ).map(res => this.extractData(res, Sweep.fromObject))
            .catch(this.handleError);
    }
}
