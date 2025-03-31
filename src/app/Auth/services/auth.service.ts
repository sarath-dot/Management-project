import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(payload: any) {
    return this.http.post(environment.loginUrl, payload);
  }

  public signup(payload: any) {
    console.log(payload);
    return this.http.post(environment.signupUrl, payload);
  }
}
