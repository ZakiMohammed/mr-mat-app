import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string = environment.apiUrl + 'customer/';
  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAll() : Observable<Customer[]> {
    return this.http.get(this.url, { headers: this.headers })
      .pipe(map(response => <Customer[]>response));
  }

  get(id: number) : Observable<Customer> {
    return this.http.get(this.url + '/' + id, { headers: this.headers })
      .pipe(map(response => <Customer>response));
  }

  post(customer: Customer): Observable<Customer> {    
    return this.http.post(this.url, customer, { headers: this.headers })
      .pipe(map(response => <Customer>response));
  }

  put(id: number, customer: Customer): Observable<Customer> {    
    return this.http.post(this.url + '/' + id, customer, { headers: this.headers })
      .pipe(map(response => <Customer>response));
  }

  delete(id: number) {    
    return this.http.delete(this.url + '/' + id, { headers: this.headers });
  }
}
