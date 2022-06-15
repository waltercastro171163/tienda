import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit{


  public newProducto!: FormGroup;
  public file: any = null;
  public loading = false;
  imageSrc: string = '';

  constructor(private fb: FormBuilder, private productoSv: ProductoService) { }

  ngOnInit(): void {
    this.initialForm();
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
    this.newProducto = this.fb.group({
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

    if (this.newProducto.invalid) {
      this.newProducto.markAllAsTouched();
      this.loading = false;
      return;
    }

    if(this.file === null){
      alert("Por favor seleccione una imagen");
      this.loading = false;
      return;
    }



    this.productoSv.guardarImagen(this.file).subscribe((res: any) => {
      this.newProducto.value.img = res.urlImg;

      this.productoSv.crearProducto(this.newProducto.value)
      .subscribe(producto => {
        this.file = null;
        this.loading = false;
        alert("Producto creado con exito")
        this.newProducto.reset();
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
    //this.authSv.authLogin(this.loginForm.value.email, this.loginForm.value.password);

  }

  isValid(campo: string){
    return  this.newProducto.controls[campo].errors &&
            this.newProducto.controls[campo].touched
  }

}
