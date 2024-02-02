import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiginService {
  constructor(private http: HttpClient) {}

  verificarUsuaris(username: string, password: string): Observable<any> {
    // console.log(username, password);
    return this.http.get('http://ionic-adrienric.scienceontheweb.net/sigin.php?username=' + username +'&password=' + password);
  }

  verificaSession(username: string): Observable<any> {
    return this.http.get('http://ionic-adrienric.scienceontheweb.net/compruebaSession.php?username=' + username);
  }
}
