import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListadoMonedasComponent} from './domain/components/listado-monedas/listado-monedas.component';
import {RealizarCambioComponent} from './domain/components/realizar-cambio/realizar-cambio.component';


const routes: Routes = [
  {path: 'lista', component: ListadoMonedasComponent},
  {path: 'conversor', component: RealizarCambioComponent},
  {path: '**', redirectTo: '/lista'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
