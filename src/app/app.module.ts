import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Estos se crean automaticamente.
import { MenuComponent } from './component/menu/menu.component';
import { InicioComponent } from './component/inicio/inicio.component';

import { FooterComponent } from './component/footer/footer.component';
import { FutbolComponent } from './component/futbol/futbol.component';
import { TenismesaComponent } from './component/tenismesa/tenismesa.component';
import { NatacionComponent } from './component/natacion/natacion.component';
import { LoginComponent } from './component/login/login.component';
import { CrearEmpleadosComponent } from './component/empleados/crear-empleados/crear-empleados.component';
import { JefesCrearComponent } from './component/jefes/jefes-crear/jefes-crear.component';
import { PaginaNoAutorizadaComponent } from './component/pagina-no-autorizada/pagina-no-autorizada.component';


//*estos son requisitos cuando trabajamos con formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//http
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './component/empleados/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarritoComponent } from './component/carrito/carrito.component';
import { NewProductoComponent } from './component/new-producto/new-producto.component';
import { ProductosComponent } from './component/productos/productos.component';
import { UpdateProductoComponent } from './component/update-producto/update-producto.component';
import { CheckoutComponent } from './component/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    FooterComponent,
    FutbolComponent,
    TenismesaComponent,
    NatacionComponent,
    LoginComponent,
    CrearEmpleadosComponent,
    PaginaNoAutorizadaComponent,
    IndexComponent,
    JefesCrearComponent,
    CarritoComponent,
    NewProductoComponent,
    ProductosComponent,
    UpdateProductoComponent,
    CheckoutComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
