import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public updateProducto!: FormGroup;
  producto: any;
  public file: any = null;
  public img = null;
  imageSrc: string = '';
  public loading = false;
  public id: string = '';

  constructor(
      private rutaActiva: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private productoSv: ProductoService) { }

  ngOnInit(): void {
    this.initialForm();
    const param = this.rutaActiva.snapshot.params["id"];
    console.log(param)
    this.productoSv.obtenerProductoId(param).subscribe((res: any) => {
      console.log(res)
      this.producto = res.producto;
      this.id = res.producto._id;
      this.updateProducto.get("nombre")!.patchValue(res.producto.nombre);
      this.updateProducto.get("descripcion")!.patchValue(res.producto.descripcion);
      this.updateProducto.get("stock")!.patchValue(res.producto.stock);
      this.updateProducto.get("precio")!.patchValue(res.producto.precio);
      this.updateProducto.get("categoria")!.patchValue(res.producto.categoria);
      this.imageSrc = res.producto.img;
    })

  }

  upload(e: any){
    const reader = new FileReader();

    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      this.file = file;
      reader.readAsDataURL(file);
      reader.onload = () => {

        this.imageSrc = reader.result as string;
      };

    }
  }

  initialForm(): void {
    this.updateProducto = this.fb.group({
      nombre      : ['', [ Validators.required,] ],
      descripcion : ['', [ Validators.required] ],
      categoria   : ['', [ Validators.required] ],
      stock       : ['', [ Validators.required] ],
      precio      : ['', [ Validators.required] ]
    });
  }

  onSubmit(){
    this.loading = true;

    let img = '';
    let deleteImgCloud = false; /// Bolean para saber si borramos la imagen de cloudinary

    if (this.updateProducto.invalid) {
      this.updateProducto.markAllAsTouched();
      this.loading = false;
      return;
    }

    if(this.file === null){
      // SI ES NULL MANTENGO LA IMAGEN QUE TENIA
      this.updateProducto.value.img = this.imageSrc;
      this.productoSv.updateProducto(this.id,this.updateProducto.value,deleteImgCloud = false)
      .subscribe(producto => {
        this.file = null;
        this.loading = false;
        alert("Producto actualizado con exito")
        this.updateProducto.reset();

      }, err => {
        alert("Error al guardar el producto, intentelo nuevamente");
        this.loading = false;
      })

    }else{
      // SI NO ES NULL SIGNIFICA QUE ACTUALIZARA LA IMAGEN
      this.productoSv.guardarImagen(this.file).subscribe((res: any) => {
        this.updateProducto.value.img = res.urlImg;

        this.productoSv.updateProducto(this.id,this.updateProducto.value,deleteImgCloud = true)
        .subscribe(producto => {
          this.file = null;
          this.loading = false;
          alert("Producto actualizado con exito")
          this.updateProducto.reset();
          console.log(producto)
        }, err => {
          alert("Error al guardar el producto, intentelo nuevamente");
          this.loading = false;
        })

      }, err => {
        alert("Error al guardar la imagen, intente con otra imagen")
        this.loading = false;
        return;
      })
    }




    //this.authSv.authLogin(this.loginForm.value.email, this.loginForm.value.password);

  }

  isValid(campo: string){
    return  this.updateProducto.controls[campo].errors &&
            this.updateProducto.controls[campo].touched
  }


}
