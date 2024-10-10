import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  checkData(body: any) {
    return this.http.post("http://localhost:3000/add/", body)
  }

}
