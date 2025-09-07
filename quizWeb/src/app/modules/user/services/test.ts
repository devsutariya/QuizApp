import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorage } from '../../auth/services/user-storage';

const Basic_Url = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class Test {
  
  constructor(private http:HttpClient) { }

  getAllTest(): Observable<any>{
    return this.http.get(Basic_Url + `api/test`);
  }

  getTestQuestions(id:number): Observable<any>{
    return this.http.get(Basic_Url + `api/test/${id}`);
  }

  submitTest(data:any): Observable<any>{
    return this.http.post(Basic_Url + `api/test/submit-test`, data);
  }

  getMyTestResult(): Observable<any>{
    return this.http.get(Basic_Url + `api/test/test-result/${UserStorage.getUserId()}`);
  }
}
