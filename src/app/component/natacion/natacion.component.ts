import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-natacion',
  templateUrl: './natacion.component.html',
  styleUrls: ['./natacion.component.css']
})
export class NatacionComponent implements OnInit {

  productos: any = [];

  constructor(private productosSv: ProductoService, private cart: CarritoService) { }

  ngOnInit(): void {
    this.productosSv.filtrarPorCategoria('natacion').subscribe((res: any) => {
      this.productos = res.productos;
    })
  }

  addCart(item: any){
    this.cart.añadirProducto(item);
  }

}
