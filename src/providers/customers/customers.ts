import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomersProvider {
  data: any;
  constructor(public http: Http) {
    this.data = null;
  }
  load() {
    return new Promise(resolve => {
      this.http.get('http://railcarrxpitstopapi20170516123440.azurewebsites.net/api/values/')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          //console.log(this.data);
        });
    });
  }
  getAll() {
    var _hdrs = new Headers();
    _hdrs.set('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise(resolve => {
      this.http.get('http://railcarrxpitstopapi20170516123440.azurewebsites.net/api/values/', { headers: _hdrs }).map((response: Response) => {
        //console.log(response.json());
        this.data = response.json();
        //return response.json();
      }).subscribe();
    });
  }
  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
