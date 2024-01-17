import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServeiPublicacioService {
  constructor(private http: HttpClient) {}
  
  subirImg(img: string): Observable<any> {
    console.log("funciona la funcion subir img");
  
    return this.http.post('http://localhost/ionic/nuevaPublicacion.php', {
    img: img,
  },
  {
    observe: 'response',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
);

  } 
}

