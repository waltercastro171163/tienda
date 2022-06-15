import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-futbol',
  templateUrl: './futbol.component.html',
  styleUrls: ['./futbol.component.css']
})
export class FutbolComponent implements OnInit {

  futbol: any[] = [];

  constructor(private productoSv: ProductoService, private cart: CarritoService) { }

  ngOnInit(): void {
    this.filtrarProductos();
  }

  filtrarProductos(){
    this.productoSv.filtrarPorCategoria('futbol').subscribe((res: any) => {
      this.futbol = res.productos;
      console.log(res)
    })
  }

  addCart(item: any){
    this.cart.añadirProducto(item);
  }

}
