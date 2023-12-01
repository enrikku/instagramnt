import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  usuarioForm: FormGroup;
  loginCorrecto: boolean = true;
  errorMessage: string = '';

  constructor(private loginService: LoginService, private fb: FormBuilder, private Router: Router) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  crearUsuario() {
    // Verifica si el formulario es válido antes de realizar la solicitud
    if (this.usuarioForm.valid) {
      // Accede a los valores del formulario
      const { nombre, apellido, email, username, password } = this.usuarioForm.value;

      this.loginService.crearUsuario2(nombre, apellido, email, username, password).subscribe((response) => {
        console.log(response);


        if(response.body.status == "success") {
          this.loginCorrecto = true;
          this.errorMessage = response.body.message;
          
          console.log('Login correcte');
          this.Router.navigate(['/sigin']);
          
        } 
        else {
          this.loginCorrecto = false;
          this.errorMessage = response.body.message;
          console.log('Login incorrecte');
        }
      });
    }
  }
  ngOnInit() {}
}
