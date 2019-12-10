import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {IngredienteListComponent} from './ingrediente/ingrediente-list.component';
import {IngredienteFormComponent} from './ingrediente/ingrediente-form.component';
import {ComidaListComponent} from './comida/comida-list.component';
import {ComidaFormComponent} from './comida/comida-form.component';
import {ClienteListComponent} from './cliente/cliente-list.component';
import {ClienteFormComponent} from './cliente/cliente-form.component';
import {CardapioListComponent} from './cardapio/cardapio-list.component';
import {CardapioFormComponent} from './cardapio/cardapio-form.component';
import {TamanhoFormComponent} from './tamanho/tamanho-form.component';
import {TamanhoListComponent} from './tamanho/tamanho-list.component';
import {LoginComponent} from './login/login.component';
import {PedidoListComponent} from "./pedido/pedido-list.component";
import {PedidoFormComponent} from "./pedido/pedido-form.component";
import {TipoListComponent} from "./tipo/tipo-list.component";
import {TipoFormComponent} from "./tipo/tipo-form.component";
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'inicio', component: HomeComponent
  },
  {
    path: 'ingrediente', component: IngredienteListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ingrediente/form', component: IngredienteFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comida', component: ComidaListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comida/form', component: ComidaFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cliente', component: ClienteListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cliente/form', component: ClienteFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cardapio', component: CardapioListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cardapio/form', component: CardapioFormComponent, canActivate: [AuthGuard]
  } ,
  {
    path: 'tamanho', component: TamanhoListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'tamanho/form', component: TamanhoFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'pedido', component: PedidoListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'pedido/form', component: PedidoFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'tipo', component: TipoListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'tipo/form', component: TipoFormComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
