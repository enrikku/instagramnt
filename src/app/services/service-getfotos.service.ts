import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGetfotosService {

  constructor(public http: HttpClient) { }

  getFotos(): Observable<any> {
    return this.http.get('http://ionic-adrienric.scienceontheweb.net/getPublicaciones.php');
  }
}
