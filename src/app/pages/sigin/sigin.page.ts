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
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, FormsModule],
})
export class SiginPage implements OnInit {
  username: string = '';
  password: string = '';
  remember: boolean = false;

  constructor(private siginService: SiginService, private Router: Router) {
  }

  recordarCredenciales() {}

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  verificarUsuaris(username: string, password: string) {
    this.siginService
      .verificarUsuaris(username, password)
      .subscribe((response) => {
        // Si el inicio de session es correcto se redirige al home
        if (response.status == 'success') {
          // document.cookie = 'nombre=username; expires=fecha; paht=/';
          document.cookie = "nombreUsuario=" + username + "; expires=" + new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString() + "; path=/";

          // Si quiere recordar credenciales se guarda en localstorage
          // if (this.remember == true) {
          //   localStorage.setItem('username', username);
          //   localStorage.setItem('remember', this.remember.toString());
          // } else {
          //   // Aqui guardamos el recordarme como false para no comprobar si existen las credenciales
          //   localStorage.setItem('remember', this.remember.toString());
          // }

          this.Router.navigate(['/home']);
        } else {
          console.log('Login incorrecte');
        }
      });
  }
  ngOnInit() {}

 
}
