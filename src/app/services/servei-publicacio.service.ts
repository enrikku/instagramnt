import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServeiPublicacioService {
  constructor(private http: HttpClient) {}

  subirImg(img: string, username: string): Observable<any> {
    console.log('funciona la funcion subir img');

    return this.http.post(
      'http://localhost/ionic/nuevaPublicacion.php',
      {
        img: img,
        username: username
      },
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  darLike(idPublicacio: string, username: string): Observable<any> {
    console.log('funciona la funcion dar like');
    return this.http.post(
      'http://localhost/ionic/darLike.php',
      {
        idPublicacio: idPublicacio,
        username: username
      },
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
  }

  publicarComentario(idPublicacio: string, username: string, comentario: string): Observable<any> {
    console.log('funciona la funcion dar like');
    return this.http.post(
      'http://localhost/ionic/publicarComentario.php',
      {
        idPublicacio: idPublicacio,
        username: username,
        comentario: comentario
      },
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
  }
}
