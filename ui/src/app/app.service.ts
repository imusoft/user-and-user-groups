import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  addData(body: any) {
    return this.http.post("http://localhost:3000/add/", body)
  }

  editData(body: any) {
    return this.http.post("http://localhost:3000/edit/", body)
  }

  deleteData(body: any) {
    return this.http.post("http://localhost:3000/delete/", body)
  }

  getData() {
    return this.http.post("http://localhost:3000/get/", {})
  }

}
