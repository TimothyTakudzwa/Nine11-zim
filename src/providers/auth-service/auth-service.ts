import { Observable } from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http, Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { ReportsResponse } from "../request/ReportsResponse";
let apiUrl = ' http://www.houseofsmiles.co.zw/nine11/api/';

 
@Injectable()
export class AuthService {
    data: string;
    public objects : any;
  constructor(public http : Http) {
    this.objects=null;
    console.log('Hello AuthService Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err); 
        });
    });
 
  }

postItem(credentials,type):Observable<ReportsResponse>{
    return this.http.post(apiUrl + type, JSON.stringify(credentials))
    .map((response:Response)=>response.json());
}

getRemoteData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
        .map(res => res.json())
            .subscribe(data=> {
                
                this.objects = data;
                console.log(this.objects);
    
    }, err => {
        console.log(err);
    });
}
}