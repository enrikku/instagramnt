import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServeiPublicacioService } from '../services/servei-publicacio.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.page.html',
  styleUrls: ['./nueva-publicacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class NuevaPublicacionPage implements OnInit {
  constructor(public ServeiPublicacioService: ServeiPublicacioService, private router: Router) { }

  imgBase64: string = "";
  ngOnInit() {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      this.imgBase64 = reader.result as string;
      // Aquí puedes utilizar la cadena base64 como necesites
      console.log(this.imgBase64);
    };
  
    reader.readAsDataURL(file);
  }
    
  sendImg() {
    //console.log("img" + this.imgBase64);
    const cookieValue = document.cookie.split('=')[1];
    //console.log(cookieValue)

    this.ServeiPublicacioService.subirImg(this.imgBase64, cookieValue).subscribe((response) => {
      console.log(response);
      console.log(response.status);
      if (response.status === 200) {
        this.router.navigate(['/home']);
      }
    
    });
  }


}
