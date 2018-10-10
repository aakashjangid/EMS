import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/yammer";

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.url + "/user/login", { email: email, password: password }, httpOptions).pipe(
    );
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<boolean>(this.url + "/user/register", { firstName: firstName, lastName: lastName, email: email, password: password }, httpOptions).pipe(
    );
  }

}
