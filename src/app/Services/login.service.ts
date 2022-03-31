import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable,of,throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })

export class LoginService {

  serverLoginUrl = "https://google.com";
  accessToken:string;

  constructor( private http: HttpClient ) { }

  login(user): Observable<any> {
    let headers = this.createLoginRequestHeader();
    return this.http
    .post(this.serverLoginUrl, user, {headers: headers,})
    .pipe(
      map((body: any) => body),
       catchError(() => {
         return throwError(() => new Error('error, could not log user in'))
       })
    );
  }   
  
  setAuthToken(token){
    this.accessToken = token;
  }    

  private createLoginRequestHeader() {
    // set headers here e.g.
    let headers = new HttpHeaders({
        "AuthKey": "my-key",
        "AuthToken": "my-token",
        "Content-Type": "application/json",
     });
    return headers;
  }    

}