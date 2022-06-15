import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  productosStorage: any = [];
  total: number = 0;

  constructor(private cartSv: CarritoService) { }

  ngOnInit(): void {
    this.storage();
  }

  storage(){
    this.productosStorage = JSON.parse(localStorage.getItem('productos')!) ?? [];
    this.productosStorage.forEach((p: any) => {
      this.total = this.total + (p.cantidad * Number(p.precio));
    });
  }
  eliminarCart(item: any){
    let menos = item.cantidad * Number(item.precio);
    this.productosStorage = this.productosStorage.filter((p:any) => p._id !== item._id);
    this.cartSv.disminuirCarrito(item.cantidad);
    this.total = this.total - menos;
    localStorage.setItem('productos',JSON.stringify(this.productosStorage));
  }

  aumentar(item: any){
    item.cantidad++;
    let prev: any[] = JSON.parse(localStorage.getItem('productos')!) || [];
    prev = prev.filter((p: any) => p._id !== item._id);
    prev.push(item)
    localStorage.setItem('productos',JSON.stringify(prev));
    this.total = this.total + Number(item.precio);
    this.cartSv.aumentarCarrito();
  }

  disminuir(item: any){
    if(item.cantidad === 1){
      return;
    }
    item.cantidad--;

    let prev: any[] = JSON.parse(localStorage.getItem('productos')!) || [];
    prev = prev.filter((p: any) => p._id !== item._id);
    prev.push(item)
    localStorage.setItem('productos',JSON.stringify(prev));
    this.cartSv.disminuirCarrito();
    this.total = this.total - item.precio;
  }

}
