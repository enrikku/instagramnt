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
  siginCorrecto: boolean = true;
  errorMessage: string = '';

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

          this.Router.navigate(['/home']);
        } 
        else {
          console.log('Login incorrecte');
          this.siginCorrecto = false;
          this.errorMessage = "Usuario o contraseña incorrecta";
        }
      });
  }
  ngOnInit() {}

 
}
