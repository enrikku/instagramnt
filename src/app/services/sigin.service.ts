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
    return this.http.get('http://localhost/ionic/sigin.php?username=' + username +'&password=' + password);
  }

  verificaSession(username: string): Observable<any> {
    return this.http.get('http://localhost/ionic/compruebaSession.php?username=' + username);
  }
}
