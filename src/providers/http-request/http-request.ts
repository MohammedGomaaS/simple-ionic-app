import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseURL } from '../../app-base-url/base-url';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class HTTPRequestProvider {
  private baseURL: string;

  private options: RequestOptions;
  constructor(private http: Http) {
    this.baseURL = new BaseURL().getBaseURL();
  }
 
  
  search(searchParams: any[], urlPart) {
    let search = new URLSearchParams();
    for (let i = 0; i < searchParams.length; i++) {
      search.set(searchParams[i].key, searchParams[i].value);
    }
    return this.http.get(this.baseURL + urlPart, { search }).pipe(
      map(this.extractData)

    );
  }
  

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);

    return Observable.throw(errMsg);
  }



}


