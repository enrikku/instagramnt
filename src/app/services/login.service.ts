import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  crearUsuario(
    nombre: string,
    apellido: string,
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    return this.http.get(
      'http://localhost/ionic/login.php?nombre=' + nombre + '&apellido=' + apellido + '&email=' + email +'&username=' + username + '&password=' + password

    );
  }
}
