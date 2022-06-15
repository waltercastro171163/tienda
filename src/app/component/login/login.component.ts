import { Component, OnInit } from '@angular/core';

//* Procdemos a importar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JefeService } from 'src/app/servicios/jefe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //*Son variables auxiliares
  public user: any;
  public token: any;
  public identity: any;
  public nombre: any;
  public mensaje_ok: any;
  public mensaje_erro: any;

  formValue !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jefeservice: JefeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.camposLogin();
  }

  //*Captura campos del formulario.
  camposLogin() {

    //*Captura de los datos registrados en el formuario.
    this.formValue = this.formBuilder.group({
      correo: [''],
      contrasena: ['']
    })
  }

  login() {

    if (this.formValue.value.correo == "") {
      alert("debe diligenciar el correo")
    }
    else if (this.formValue.value.contrasena == "") {
      alert("debe diligenciar su contraseña")
    }

    else {

      this.jefeservice.login(this.formValue.value).subscribe(
        response => {

          if (response.mensaje =="correo incorrecto") {
            alert("el correo no existe")
          }
          else if (response.mensaje == "Contraseña incorrecta") {
            alert("la contarseña no es correcta")
          }
          else {

            console.log(response.mensaje)
            alert("inicio de sesion correcto")

            //*Estas variables auxiliares contienen los datos de la BD
            this.token = response.token
            this.nombre = response.nombre
            this.identity = response.id

            localStorage.setItem('token', this.token);
            localStorage.setItem('nombre', this.nombre);
            localStorage.setItem('id', this.identity);

            this.jefeservice.login(this.formValue.value).subscribe(

              response => {
                console.log(response)
                this.router.navigate(['/'])
              },

              error => {
                console.log(error)
                alert(error)
              }
            )
          }
        },

        error => {
          console.log(error)
          alert(error)
        }
      )

    }
  }




}
