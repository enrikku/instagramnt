import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SiginService } from '../services/sigin.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'
import { ServiceGetfotosService } from '../services/service-getfotos.service';
import { ServeiPublicacioService } from '../services/servei-publicacio.service';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {


  username: string | null = '';
  recordarme: string | null = '';
  public fotos: any; 
  constructor(private siginService: SiginService, private router: Router, private ServiceGetfotosService: ServiceGetfotosService, private ServeiPublicacioService: ServeiPublicacioService) {}

  checkCookie() {
    var cookie = document.cookie;

    var cookieExiste = cookie.indexOf('nombreUsuario') !== -1;
    
    return cookieExiste;
  }


  ngOnInit() {
    var existe = this.checkCookie();

    if (existe) {
      this.getFotos();
    }
    else{
      this.router.navigate(['/sigin']);
    }
  }

  getFotos() {
    this.ServiceGetfotosService.getFotos().subscribe(
      (data) => {
        // La petición fue exitosa, 'data' contiene la respuesta
        this.fotos = data;
        //console.log('Datos de fotos:', this.fotos);
      },
      (error) => {
        // La petición falló, 'error' contiene la información del error
        console.error('Error en la petición:', error);
      }
    );
  }

  navNewPub(){
    this.router.navigate(['/nueva-publicacion']);
  }

  logout(){
    document.cookie = "nombreUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    this.router.navigate(['/sigin']);
  }



  like(arg0: any) 
  {
    // Conseguir el valor de la cookie con el nombre de usuario
    const cookieValue = document.cookie.split('=')[1];

    this.ServeiPublicacioService.darLike(arg0.idPublicacio, cookieValue).subscribe(
      (data) => {
        // La petición fue exitosa, 'data' contiene la respuesta
        //console.log(data);
      }
    )
  }

  comentario: string = '';

  comentar(foto:any){
    const cookieValue = document.cookie.split('=')[1];

    this.ServeiPublicacioService.publicarComentario(foto.idPublicacio, cookieValue, this.comentario).subscribe(
      (data) => {
        // La petición fue exitosa, 'data' contiene la respuesta
        //console.log(data);
        location.reload()
      }
    )  
  }

  // Variable para realizar un seguimiento del número de comentarios que se mostrarán inicialmente
  comentariosMostrados = 2;

  // Método para aumentar el número de comentarios que se mostrarán
  mostrarMasComentarios() {
    this.comentariosMostrados += 2; // Puedes ajustar según tu necesidad
  }
  
}
