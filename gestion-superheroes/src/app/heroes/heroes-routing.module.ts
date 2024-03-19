import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { CrearEditarComponent } from './crear-editar/crear-editar.component';

const routes: Routes = [
  { path: '', redirectTo: 'listado', pathMatch: 'full' }, // Redirecciona a listado por defecto
  { path: 'listado', component: ListadoComponent }, // Ruta para el listado de héroes
  { path: 'crear', component: CrearEditarComponent }, // Ruta para crear un nuevo héroe
  { path: 'editar/:id', component: CrearEditarComponent } // Ruta para editar un héroe existente
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
