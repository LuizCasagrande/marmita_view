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
import {AlergiaFormComponent} from "./alergia/alergia-form.component";
import {FavoritoFormComponent} from "./favorito/favorito-form..component";
import {TamanhoPedido} from "./pedido/tamanho-pedido/tamanho-pedido";
import {TamanhoPedidoComponent} from "./pedido/tamanho-pedido/tamanho-pedido.component";


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'inicio', component: HomeComponent
  },
  {
    path: 'ingrediente', component: IngredienteListComponent
  },
  {
    path: 'ingrediente/form', component: IngredienteFormComponent
  },
  {
    path: 'comida', component: ComidaListComponent
  },
  {
    path: 'comida/form', component: ComidaFormComponent
  },
  {
    path: 'cliente', component: ClienteListComponent
  },
  {
    path: 'cliente/form', component: ClienteFormComponent
  },
  {
    path: 'cardapio', component: CardapioListComponent
  },
  {
    path: 'cardapio/form', component: CardapioFormComponent
  } ,
  {
    path: 'tamanho', component: TamanhoListComponent
  },
  {
    path: 'tamanho/form', component: TamanhoFormComponent
  },
  {
    path: 'pedido', component: PedidoListComponent
  },
  {
    path: 'pedido/form', component: PedidoFormComponent
  },
  {
    path: 'tipo', component: TipoListComponent
  },
  {
    path: 'tipo/form', component: TipoFormComponent
  },
  {
    path: 'alergia/form', component: AlergiaFormComponent
  },
  {
    path: 'favorita/form', component: FavoritoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
