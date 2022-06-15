import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Se colocan los respectivo componentes que no se van a repetir en otras paginas
import { InicioComponent } from './component/inicio/inicio.component';
import { FutbolComponent } from './component/futbol/futbol.component';
import { NatacionComponent } from './component/natacion/natacion.component';
import { TenismesaComponent } from './component/tenismesa/tenismesa.component';
import { LoginComponent } from './component/login/login.component';
import { JefesCrearComponent } from './component/jefes/jefes-crear/jefes-crear.component';
import { CarritoComponent } from './component/carrito/carrito.component';
import { NewProductoComponent } from './component/new-producto/new-producto.component';
import { ProductosComponent } from './component/productos/productos.component';
import { UpdateProductoComponent } from './component/update-producto/update-producto.component';
import { CheckoutComponent } from './component/checkout/checkout.component';



// Aqui colocamos los path de los respectivos componentes.
const routes: Routes = [

{path: 'inicio', component:InicioComponent},
{path: 'futbol', component:FutbolComponent},
{path: 'natacion', component:NatacionComponent},
{path: 'tenisdemesa', component:TenismesaComponent},
{path: 'jefe-crear', component:JefesCrearComponent},
{path: 'carrito', component:CarritoComponent},
{path: 'new-producto', component:NewProductoComponent},
{path: 'productos', component:ProductosComponent},
{path: 'update-producto/:id', component:UpdateProductoComponent},
{path: 'checkout', component: CheckoutComponent},



{path: 'login', component:LoginComponent},

//* Este se coloca para que la pagina simpre arranque por aqui (inicio)
// {path: '', component:LoginComponent  }
{path: '', component: InicioComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
