import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-tenismesa',
  templateUrl: './tenismesa.component.html',
  styleUrls: ['./tenismesa.component.css']
})
export class TenismesaComponent implements OnInit {

  productos: any = [];

  constructor(private productosSv: ProductoService, private cart: CarritoService) { }

  ngOnInit(): void {
    this.productosSv.filtrarPorCategoria('tenis-de-mesa').subscribe((res: any) => {
      this.productos = res.productos;
    })
  }

  addCart(item: any){
    this.cart.añadirProducto(item);
  }

}
