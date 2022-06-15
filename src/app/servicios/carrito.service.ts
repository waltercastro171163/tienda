import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2'
/* import swal from'sweetalert2'; */

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public cart$ = new BehaviorSubject<number>(0);
  public cartStorage = 0;
  public prevProducto: any = [];

  constructor() {
    this.cart$.next( JSON.parse(localStorage.getItem("storageCart")!) || 0 );
  }

  aumentarCarrito(){
    this.cart$.next(this.cart$.value + 1);
    localStorage.setItem("storageCart", JSON.stringify(this.cart$.value));
  }
  disminuirCarrito(num: number = 1){
    if(this.cart$.value === 0){
      return;
    }
    this.cart$.next(this.cart$.value - num);
    localStorage.setItem("storageCart", JSON.stringify(this.cart$.value));
  }

  añadirProducto(producto: any){
    let prev: any[] = JSON.parse(localStorage.getItem('productos')!) || [];
    // Primero validamos si el producto existe en el carrito
    let existe = prev.find((p) => p._id === producto._id);
    if(!!existe){
      prev.map((p) => {
        if(p._id === producto._id){
          p.cantidad++
        }
        return p;
      })
    }else{
      producto.cantidad = 1;
      prev.push(producto)
    }

    localStorage.setItem('productos',JSON.stringify(prev));
    this.aumentarCarrito();
    this.mensaje("Agregado correctamente")
  }

  vaciarCarrito(){
    this.cart$.next(0);
    localStorage.removeItem("storageCart");
    localStorage.removeItem("productos");
  }
  mensaje(texto: string){
    Swal.fire(texto, 'Correcto!', 'success');
  }
}
