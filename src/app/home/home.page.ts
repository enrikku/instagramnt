import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SiginService } from '../services/sigin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  username: string | null = '';
  recordarme: string | null = '';
  constructor(private siginService: SiginService, private router: Router) {}

  checkCookie() {
    var cookie = document.cookie;

    var cookieExiste = cookie.indexOf('nombreUsuario') !== -1;
    
    return cookieExiste;
  }


  ngOnInit() {
    var existe = this.checkCookie();

    if (existe) {
      console.log('existe');
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

  logout(){
    document.cookie = "nombreUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    this.router.navigate(['/sigin']);
  }
}
