import { Component, OnInit } from '@angular/core';

import { JefeService} from 'src/app/servicios/jefe.service';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  public numberCart: number = 0;

//variables auxiliares
  public id: any;
  public token: any;
  public nombre: any;
  public admin: boolean = false;

  constructor(private jefeService:JefeService, private router:Router, private cartSv: CarritoService)
  {
    this.id= this.jefeService.obtenerIdentidad();
    this.token= this.jefeService.obtenerToken();
    this.nombre= this.jefeService.obtenerNombre();
  }

  ngOnInit(): void {
    this.cartSv.cart$.subscribe(valor => {
      this.numberCart = valor;
    }
    )
    this.validarAdmin();
  }

  validarAdmin(){
    const isTokenValido = this.jefeService.obtenerToken();
    if(!!isTokenValido){
      this.admin = true;
    }else{
      this.admin = false;
    }
  }

  cerrarSesion(){

    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('id');

    this.id=null;
    this.token=null;
    this.nombre=null;


    this.router.navigate([''])

  }



}
