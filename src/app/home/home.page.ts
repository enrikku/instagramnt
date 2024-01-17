import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SiginService } from '../services/sigin.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'
import { ServiceGetfotosService } from '../services/service-getfotos.service';


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  username: string | null = '';
  recordarme: string | null = '';
  public fotos: any; 
  constructor(private siginService: SiginService, private router: Router, private ServiceGetfotosService: ServiceGetfotosService) {}

  checkCookie() {
    var cookie = document.cookie;

    var cookieExiste = cookie.indexOf('nombreUsuario') !== -1;
    
    return cookieExiste;
  }


  ngOnInit() {
    var existe = this.checkCookie();

    if (existe) {
      console.log('existe');
      this.getFotos();
    }
    else{
      this.router.navigate(['/sigin']);
    }


    // this.username = 'Eva';
    // this.siginService
    //   .verificaSession(this.username)
    //   .subscribe((response) => {
    //     if (response.status == 'success') 
    //     {
    //       console.log(response);
    //     } 
    //     else 
    //     {
    //       console.log(response);
    //       this.router.navigate(['/sigin']);
    //     }
    //     // console.log(response);
    //   });

  }

  getFotos() {
    this.ServiceGetfotosService.getFotos().subscribe(
      (data) => {
        // La petición fue exitosa, 'data' contiene la respuesta
        this.fotos = data;
        console.log('Datos de fotos:', this.fotos);
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
}
