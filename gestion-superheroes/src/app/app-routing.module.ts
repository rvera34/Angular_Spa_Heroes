import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', //Si fuera necesario mas acciones añadir aqui heroes y añadir distintOS modulos
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
