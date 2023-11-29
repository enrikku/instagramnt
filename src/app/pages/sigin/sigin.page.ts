import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SiginService } from 'src/app/services/sigin.service';
import { HttpClientModule } from '@angular/common/http';
import { Navigation, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.page.html',
  styleUrls: ['./sigin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class SiginPage implements OnInit {
  username: string = '';
  password: string = '';
  infoUser?: NavigationExtras;

  constructor(private siginService: SiginService,  private Router: Router) {}

  verificarUsuaris(username: string, password: string) {
    this.siginService
      .verificarUsuaris(username, password)
      .subscribe((response) => {
        
        console.log(response);
        if (response.status == "success") {


          this.infoUser = {
            state:{
              username: username
            }
          }


          console.log('Login correcte');
          console.log(this.infoUser);
          // Quiero enviar el username a la pagina home
          
          this.Router.navigate(['/home', this.infoUser]);
        } else {
          console.log('Login incorrecte');
        }
        
      });
  }
  ngOnInit() {}
}
