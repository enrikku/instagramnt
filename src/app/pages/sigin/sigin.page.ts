import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SiginService } from 'src/app/services/sigin.service';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private siginService: SiginService) {}

  verificarUsuaris(username: string, password: string) {
    this.siginService
      .verificarUsuaris(username, password)
      .subscribe((response) => {
        
        console.log(response);
        if (response.status == "success") {
          console.log('Login correcte');
        } else {
          console.log('Login incorrecte');
        }
        
      });
  }
  ngOnInit() {}
}
