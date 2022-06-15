import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any = [];
  value: string = '';

  constructor(private productosSv: ProductoService) { }

  ngOnInit(): void {
    this.productosSv.obtenerProductos().subscribe((res: any) => {
      this.productos = res.productos
    })
  }

  filtrar(){ // Filtrar por nombre
    this.productosSv.filtrarPorNombre(this.value).subscribe((res: any) => {
      this.productos = res.producto;
    })
  }

  textFiltro(e: any){
    const texto = e.target.value;
    this.value = texto;
  }

  obtenerCategoria(categoria: string){
    this.productosSv.filtrarPorCategoria(categoria).subscribe((res: any) => {
      console.log(res.productos)
      this.productos = res.productos
    })
  }

  eliminar(id: string){
    this.productosSv.deleteProducto(id).subscribe(res => {
      this.productos =  this.productos.filter((p: any) => p._id !== id)
    })
  }

}
