import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';

import {AppSettings} from '../config/app.service';

import {Operation} from '../models/operation';
import {RestService} from "./rest.service";
import {RestObject} from "../models/RestObject";

@Injectable()
export class OperationService extends RestService {

    constructor(http: Http) {
        super(http);
    }

    public getAll(): Observable<RestObject<Operation>> {
        let requestOptions = new RequestOptions();
        let headers = new Headers();
        headers.append('Authorization', AppSettings.TOKEN);
        requestOptions.headers = headers;

        return this.http.get(AppSettings.API_ENDPOINT + AppSettings.API_VERSION +
            'operations', requestOptions
        ).map(res => this.extractDataArray<Operation>(res, Operation.fromObject))
            .catch(this.handleError);
    }

    public getWithSearch(search: URLSearchParams): Observable<RestObject<Operation>> {
        let requestOptions = new RequestOptions();
        let headers = new Headers();
        headers.append('Authorization', AppSettings.TOKEN);
        requestOptions.headers = headers;
        requestOptions.search = search;

        return this.http.get(AppSettings.API_ENDPOINT + AppSettings.API_VERSION +
            'operations', requestOptions
        ).map(res => this.extractDataArray<Operation>(res, Operation.fromObject))
            .catch(this.handleError);
    }

    public create(operation: Operation): Observable<Operation> {
        let requestOptions = new RequestOptions();
        let headers = new Headers();
        headers.append('Authorization', AppSettings.TOKEN);
        requestOptions.headers = headers;

        return this.http.post(AppSettings.API_ENDPOINT + AppSettings.API_VERSION +
            'operations', operation, requestOptions
        ).map(res => this.extractData(res, Operation.fromObject))
            .catch(this.handleError);
    }

    public update(operation: Operation): Observable<Operation> {
        let requestOptions = new RequestOptions();
        let headers = new Headers();
        headers.append('Authorization', AppSettings.TOKEN);
        requestOptions.headers = headers;

        return this.http.put(AppSettings.API_ENDPOINT + AppSettings.API_VERSION +
            'operations/' + operation.id, operation, requestOptions
        ).map(res => this.extractData(res, Operation.fromObject))
            .catch(this.handleError);
    }
}
