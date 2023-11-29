import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { SiginService } from '../services/sigin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  jsonRebut: any;
  data      : any;
  constructor(
    private siginService: SiginService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('Params:', params);
    })
  }

  // ngOnInit() {

  //   if(this.siginService.verificaSession()) {
  //     alert("Bien")
  //   }
  //   else{
  //     alert("Mal")
  //   }
  // }

  // ngOnInit() {
  //   this.route.queryParams.subscribe((params) => {
  //     const obj = params['user'];
  //     console.log('Objeto recibido:', params);
      
  //     console.log(JSON.stringify(obj));

  //     // Aquí puedes hacer lo que necesites con el objeto recibido
  //   });
  // }
}
