import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getProjectList() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>('http://localhost:8080/api/project/get', httpOptions);
  }

  public addProjectList(payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>('http://localhost:8080/api/project/add', payload, httpOptions)
  }

  public updateProjectList(id: any, payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>('http://localhost:8080/api/project/update/' + id, payload, httpOptions)
  }

  public deleteProjectList(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>('http://localhost:8080/api/project/delete/' + id, httpOptions);
  }

}
