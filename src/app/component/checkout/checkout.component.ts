import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public numberCart = 0;
  productos: any = [];
  total: number = 0;

  constructor(private cartSv: CarritoService, private fb: FormBuilder, private router: Router) { }

  public addressForm!: FormGroup;

  ngOnInit(): void {
    this.initial();
    this.initialForm();
  }

  initialForm(): void {
    this.addressForm = this.fb.group({
      nombre   : ['', [ Validators.required] ],
      apellido : ['', [ Validators.required] ],
      email    : ['', [ Validators.required, Validators.email] ],
      address  : ['', [ Validators.required] ],

      nameCard   : [, [ Validators.required] ],
      numCard    : [, [ Validators.required] ],
      expireCard : [, [ Validators.required,] ],
      cvvCard    : [, [ Validators.required] ],

    });
  }

  initial(){
    this.productos = JSON.parse(localStorage.getItem("productos")!);
    this.productos.forEach((producto: any) => {
      this.total = this.total + (Number(producto.precio) * producto.cantidad);
    });
    this.cartSv.cart$.subscribe(valor => {
      this.numberCart = valor;
    })
  }

  onSubmit(){
    console.log("Imprimiendo")

    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      console.log("Errorres")
      return;
    }
    this.cartSv.vaciarCarrito();
    alert("La compra fue todo un exito");
    this.router.navigate(['/carrito'])

  }

  isValid(campo: string){
    return  this.addressForm.controls[campo].errors &&
            this.addressForm.controls[campo].touched
  }

}
