import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Basic_Url = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  
constructor(private http: HttpClient) { }

createTest(testDto): Observable<any>{
  return this.http.post(Basic_Url + `api/test`, testDto);
}

getAllTest(): Observable<any>{
  return this.http.get(Basic_Url + `api/test`);
}

addQuestionInTest(questionDto): Observable<any>{
  return this.http.post(Basic_Url + `api/test/question`, questionDto);
}

getTestQuestions(id:number): Observable<any>{
  return this.http.get(Basic_Url + `api/test/${id}`);
}

getTestResults(): Observable<any>{
  return this.http.get(Basic_Url + `api/test/test-result`);
}
}