import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API_URL = environment.url;

  constructor(private http: HttpClient, private router: Router) { }


  crearProducto(data: any){
    return this.http.post(`${this.API_URL}productos`,data);
  }

  guardarImagen(file: any){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API_URL}upload`,formData)
  }

  eliminarProducto(){

  }

  obtenerProductos(){
    return this.http.get(`${this.API_URL}productos`);
  }

  obtenerProductoId(id: string ){
    return this.http.get(`${this.API_URL}productos/producto-id/${id}`)
  }

  filtrarPorCategoria(categoria: string){
    return this.http.get(`${this.API_URL}productos/categoria/${categoria}`);
  }

  filtrarPorNombre(nombre: string){
    return this.http.get(`${this.API_URL}productos/${nombre}`)
  }

  updateProducto(id: string, data: any, deleteImgCloud: boolean){
    return this.http.put(`${this.API_URL}productos`,{id,data,deleteImgCloud})
  }

  deleteImgCloudinary(id: string){
    return this.http.get(`${this.API_URL}upload/${id}`);
  }

  deleteProducto(id: string){
    return this.http.get(`${this.API_URL}productos/producto-inactivo/${id}`);
  }

}
