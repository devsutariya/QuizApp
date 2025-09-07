import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Basic_URL="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http:HttpClient) 
  { 

  }
  register(data): Observable<any>
  {
    return this.http.post(Basic_URL+"api/auth/sign-up",data);
  }
  login(loginRequest: any): Observable<any>
  {
    return this.http.post(Basic_URL+"api/auth/login",loginRequest);
  }
}
