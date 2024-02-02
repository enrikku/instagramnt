import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}


  crearUsuario2(nombre: string, apellido: string, email: string, username: string, password: string):Observable<any> 
  {
    // console.log("AAAAAAAAAAAAA" + nombre, apellido, email, username, password);
    return this.http.post('http://ionic-adrienric.scienceontheweb.net/login.php', {
      nombre: nombre,
      apellido: apellido,
      email: email,
      username: username, 
      password: password
    }, { observe: 'response' });

  }

  crearUsuario(
    nombre: string,
    apellido: string,
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    return this.http.get(
      'http://ionic-adrienric.scienceontheweb.net/login.php?nombre=' + nombre + '&apellido=' + apellido + '&email=' + email +'&username=' + username + '&password=' + password

    );
  }
}
