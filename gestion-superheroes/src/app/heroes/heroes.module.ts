import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { CrearEditarComponent } from './crear-editar/crear-editar.component';


@NgModule({
  declarations: [
    ListadoComponent,
    CrearEditarComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
