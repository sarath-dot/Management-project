import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private socket: Socket;
  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:8080/', {

      rejectUnauthorized: false
    });
  }

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

  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  public on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, data => {
        observer.next(data);
      })
      return () => {
        this.socket.off(event)
      }
    })
  }

}
